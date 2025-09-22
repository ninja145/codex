import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto-js';
import { nanoid } from 'nanoid';

const db = admin.firestore();

export const doctorSignup = functions.https.onCall(async (data, context) => {
    const { name, phone, pin, email } = data;

    // --- Validation ---
    if (!name || !phone || !pin || !email) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields.');
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        throw new functions.https.HttpsError('invalid-argument', 'PIN must be 4 digits.');
    }
    // A more robust phone validation would be needed for production
    if (phone.length < 10) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid phone number.');
    }

    // --- Check for existing user ---
    const doctorQuery = await db.collection('doctors').where('phone', '==', phone).get();
    if (!doctorQuery.empty) {
        throw new functions.https.HttpsError('already-exists', 'A doctor with this phone number already exists.');
    }

    try {
        // --- Create Firebase Auth user ---
        // We create a user to get a UID, which is essential for Firestore security rules and token generation.
        const userRecord = await admin.auth().createUser({
            phoneNumber: phone.startsWith('+') ? phone : `+91${phone}`, // Assuming Indian numbers if no country code
            displayName: name,
            email: email,
            disabled: false
        });
        const uid = userRecord.uid;

        // --- Hash PIN ---
        const saltRounds = 10;
        const pinHash = await bcrypt.hash(pin, saltRounds);

        // --- Generate and Encrypt per-doctor AES key ---
        // In a production environment, this MASTER_KEY should be loaded from a secure source
        // like Google Secret Manager, not hardcoded.
        const MASTER_KEY = process.env.SERVER_MASTER_KEY || 'default-super-secret-key-for-development';
        const doctorAesKey = crypto.lib.WordArray.random(256 / 8).toString(crypto.enc.Hex);
        const encryptedDoctorKey = crypto.AES.encrypt(doctorAesKey, MASTER_KEY).toString();


        // --- Generate Short ID for QR ---
        const shortId = nanoid(8); // 8 characters, URL-friendly

        // --- Define Plan Details ---
        const tierData = {
            'Starter': { bookingsLimit: 100, validityDays: 10 },
            'Growth': { bookingsLimit: 250, validityDays: 30 },
            'Scale': { bookingsLimit: 600, validityDays: 30 },
            'Pro': { bookingsLimit: 1500, validityDays: 30 },
            'Summit': { bookingsLimit: Infinity, validityDays: 30 },
        };
        const starterPlan = tierData['Starter'];

        // --- Create doctor document in Firestore ---
        const doctorData = {
            uid,
            name,
            phone,
            email,
            pinHash,
            encryptedDoctorKey: encryptedDoctorKey,
            shortId,
            shortUrl: `https://vezi.it/d/${shortId}`, // Placeholder domain
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            plan: {
                tier: 'Starter',
                bookingsUsed: 0,
                bookingsLimit: starterPlan.bookingsLimit,
                expiresAt: new Date(Date.now() + starterPlan.validityDays * 24 * 60 * 60 * 1000),
            },
        };
        await db.collection('doctors').doc(uid).set(doctorData);

        // --- Generate custom token for immediate login ---
        const customToken = await admin.auth().createCustomToken(uid);

        return { status: 'success', token: customToken };

    } catch (error: any) {
        functions.logger.error('Error in doctorSignup:', error);
        if (error.code === 'auth/phone-number-already-exists') {
             throw new functions.https.HttpsError('already-exists', 'This phone number is already in use.');
        }
        throw new functions.https.HttpsError('internal', 'An unexpected error occurred.');
    }
});


export const doctorLogin = functions.https.onCall(async (data, context) => {
    const { phone, pin } = data;

    if (!phone || !pin) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing phone or PIN.');
    }

    const doctorQuery = await db.collection('doctors').where('phone', '==', phone).limit(1).get();

    if (doctorQuery.empty) {
        throw new functions.https.HttpsError('not-found', 'No doctor found with this phone number.');
    }

    const doctorDoc = doctorQuery.docs[0];
    const doctorData = doctorDoc.data();

    const isPinValid = await bcrypt.compare(pin, doctorData.pinHash);

    if (!isPinValid) {
        throw new functions.https.HttpsError('unauthenticated', 'Invalid PIN.');
    }

    const uid = doctorDoc.id;
    const customToken = await admin.auth().createCustomToken(uid);

    return { status: 'success', token: customToken };
});


export const generatePinResetCode = functions.https.onCall(async (data, context) => {
    const { phone } = data;
    if (!phone) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing phone number.');
    }

    const doctorQuery = await db.collection('doctors').where('phone', '==', phone).limit(1).get();
    if (doctorQuery.empty) {
        throw new functions.https.HttpsError('not-found', 'No doctor found with this phone number.');
    }
    const doctorDoc = doctorQuery.docs[0];

    // --- Rate Limiting ---
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const recentGenerations = (doctorDoc.data().pinResetCodeGenerations || []).filter((ts: number) => ts > oneHourAgo);

    if (recentGenerations.length >= 3) {
        throw new functions.https.HttpsError('resource-exhausted', 'You have requested too many reset codes. Please try again later.');
    }

    // --- Generate Code ---
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10;
    const codeHash = await bcrypt.hash(resetCode, saltRounds);
    const expiry = new Date(now + 30 * 60 * 1000); // 30 minutes expiry

    // --- Update Doctor Doc ---
    await doctorDoc.ref.update({
        pinReset: {
            codeHash,
            expiry,
            attempts: 0,
        },
        pinResetCodeGenerations: [...recentGenerations, now],
    });

    // In a real app, this would be sent via SMS/Email, but per spec, we show it in-app.
    return { status: 'success', resetCode };
});


export const verifyPinResetCode = functions.https.onCall(async (data, context) => {
    const { phone, resetCode, newPin } = data;
    if (!phone || !resetCode || !newPin) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields.');
    }
     if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
        throw new functions.https.HttpsError('invalid-argument', 'New PIN must be 4 digits.');
    }

    const doctorQuery = await db.collection('doctors').where('phone', '==', phone).limit(1).get();
    if (doctorQuery.empty) {
        throw new functions.https.HttpsError('not-found', 'No doctor found with this phone number.');
    }
    const doctorDoc = doctorQuery.docs[0];
    const doctorData = doctorDoc.data();
    const pinResetData = doctorData.pinReset;

    if (!pinResetData || !pinResetData.codeHash) {
        throw new functions.https.HttpsError('failed-precondition', 'No active PIN reset request found.');
    }

    // --- Check Attempts & Expiry ---
    if (pinResetData.attempts >= 3) {
        throw new functions.https.HttpsError('resource-exhausted', 'Too many incorrect attempts. Please generate a new reset code.');
    }
    if (new Date() > pinResetData.expiry.toDate()) {
        throw new functions.https.HttpsError('deadline-exceeded', 'The reset code has expired. Please generate a new one.');
    }

    const isCodeValid = await bcrypt.compare(resetCode, pinResetData.codeHash);

    if (!isCodeValid) {
        await doctorDoc.ref.update({ 'pinReset.attempts': admin.firestore.FieldValue.increment(1) });
        throw new functions.https.HttpsError('unauthenticated', 'Invalid reset code.');
    }

    // --- Update PIN ---
    const saltRounds = 10;
    const newPinHash = await bcrypt.hash(newPin, saltRounds);

    await doctorDoc.ref.update({
        pinHash: newPinHash,
        pinReset: admin.firestore.FieldValue.delete(), // Clear the reset data
    });

    return { status: 'success', message: 'Your PIN has been reset successfully.' };
});


export const baSignup = functions.https.onCall(async (data, context) => {
    const { name, phone, pin, email, address, dob, aadhaar, pan, bankDetails, nomineeDetails, imageUrl } = data;

    // --- Basic Validation ---
    if (!name || !phone || !pin || !email || !aadhaar) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields.');
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        throw new functions.https.HttpsError('invalid-argument', 'PIN must be 4 digits.');
    }

    // --- Hash Aadhaar for duplicate checking ---
    const aadhaarHash = crypto.SHA256(aadhaar).toString();

    // --- Check for existing user ---
    const phoneQuery = await db.collection('ba').where('phone', '==', phone).get();
    if (!phoneQuery.empty) {
        throw new functions.https.HttpsError('already-exists', 'A BA with this phone number already exists.');
    }
    const aadhaarQuery = await db.collection('ba').where('aadhaarHash', '==', aadhaarHash).get();
    if (!aadhaarQuery.empty) {
        throw new functions.https.HttpsError('already-exists', 'A BA with this Aadhaar number already exists.');
    }

    try {
        // --- Create Firebase Auth user ---
        const userRecord = await admin.auth().createUser({
            phoneNumber: phone.startsWith('+') ? phone : `+91${phone}`,
            displayName: name,
            email: email,
        });
        const uid = userRecord.uid;

        // --- Hash PIN ---
        const saltRounds = 10;
        const pinHash = await bcrypt.hash(pin, saltRounds);

        // --- Generate BA Code ---
        const baCode = `BA${nanoid(6).toUpperCase()}`;

        // --- Create BA document in Firestore ---
        const baData = {
            uid,
            name,
            phone,
            email,
            address,
            dob,
            aadhaarHash, // Store hash, not the raw number
            pan, // PAN can be stored as is, or encrypted if needed
            bankDetails,
            nomineeDetails,
            imageUrl,
            pinHash,
            baCode,
            status: 'pending_kyc', // Initial status
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            walletBalance: 0,
            monthlyOnboards: 0,
            conversionStats: {
                totalOnboarded: 0,
                paidConversions: 0,
            },
            kycDocs: {
                aadhaarFront: '', // URLs will be stored here after upload
                aadhaarBack: '',
                panCard: '',
            }
        };
        await db.collection('ba').doc(uid).set(baData);

        // --- Generate custom token for immediate login ---
        const customToken = await admin.auth().createCustomToken(uid);

        return { status: 'success', token: customToken };

    } catch (error: any) {
        functions.logger.error('Error in baSignup:', error);
        if (error.code === 'auth/phone-number-already-exists') {
             throw new functions.https.HttpsError('already-exists', 'This phone number is already in use.');
        }
        throw new functions.https.HttpsError('internal', 'An unexpected error occurred during BA signup.');
    }
});

export const baLogin = functions.https.onCall(async (data, context) => {
    const { phone, pin } = data;

    if (!phone || !pin) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing phone or PIN.');
    }

    const baQuery = await db.collection('ba').where('phone', '==', phone).limit(1).get();

    if (baQuery.empty) {
        throw new functions.https.HttpsError('not-found', 'No BA found with this phone number.');
    }

    const baDoc = baQuery.docs[0];
    const baData = baDoc.data();

    if (baData.status === 'deactivated') {
        throw new functions.https.HttpsError('permission-denied', 'This account has been deactivated.');
    }

    const isPinValid = await bcrypt.compare(pin, baData.pinHash);

    if (!isPinValid) {
        throw new functions.https.HttpsError('unauthenticated', 'Invalid PIN.');
    }

    const uid = baDoc.id;
    const customToken = await admin.auth().createCustomToken(uid);

    return { status: 'success', token: customToken };
});
