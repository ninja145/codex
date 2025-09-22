import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto-js';

const db = admin.firestore();

export const createBooking = functions.https.onCall(async (data, context) => {
    const { doctorId, date, slot, patientDetails } = data;

    // --- Validation ---
    if (!doctorId || !date || !slot || !patientDetails || !patientDetails.name || !patientDetails.whatsapp) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required booking information.');
    }

    const doctorRef = db.collection('doctors').doc(doctorId);

    try {
        const doctorDoc = await doctorRef.get();
        if (!doctorDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'The specified doctor does not exist.');
        }
        const doctorData = doctorDoc.data()!;

        // --- Quota/Plan Validation ---
        if (doctorData.plan.tier !== 'Summit') { // Summit is unlimited
            if (doctorData.plan.bookingsUsed >= doctorData.plan.bookingsLimit) {
                throw new functions.https.HttpsError('resource-exhausted', 'This doctor is not accepting new bookings at the moment.');
            }
        }

        // --- Slot Validation ---
        const bookingDate = new Date(date);
        const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

        const existingBookingQuery = await db.collection('bookings')
            .where('doctorId', '==', doctorId)
            .where('date', '>=', startOfDay)
            .where('date', '<=', endOfDay)
            .where('slot', '==', slot)
            .where('status', '!=', 'cancelled')
            .limit(1)
            .get();

        if (!existingBookingQuery.empty) {
            throw new functions.https.HttpsError('already-exists', 'This time slot is no longer available. Please select another.');
        }

        // --- Decrypt Doctor's Key and Encrypt Patient Data ---
        const MASTER_KEY = process.env.SERVER_MASTER_KEY || 'default-super-secret-key-for-development';

        if (!doctorData.encryptedDoctorKey) {
            throw new functions.https.HttpsError('internal', 'Doctor data is not configured correctly for encryption.');
        }

        const decryptedDoctorKeyBytes = crypto.AES.decrypt(doctorData.encryptedDoctorKey, MASTER_KEY);
        const decryptedDoctorKey = decryptedDoctorKeyBytes.toString(crypto.enc.Utf8);

        if (!decryptedDoctorKey) {
            throw new functions.https.HttpsError('internal', 'Failed to decrypt doctor key. Check server configuration.');
        }

        const encryptedPatientPayload = crypto.AES.encrypt(JSON.stringify(patientDetails), decryptedDoctorKey).toString();

        // --- Create Booking Document ---
        const bookingData = {
            doctorId,
            date: new Date(date),
            slot,
            status: 'booked',
            source: 'qr-website',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            encryptedPatientPayload,
            notifications: {
              confirmation: { mode: 'auto', status: 'pending' },
              reminder: { mode: 'auto_toggleable', enabled: true, status: 'pending' },
              review: { mode: 'auto', status: 'pending' },
              seen: { mode: 'doctor_control', status: 'pending' },
              followup: { mode: 'doctor_control', enabled: false, status: 'pending' },
              cancellation: { mode: 'doctor_control', status: 'pending' },
            }
        };

        const bookingRef = await db.collection('bookings').add(bookingData);

        // --- Update Doctor's Booking Count ---
        await doctorRef.update({
            'plan.bookingsUsed': admin.firestore.FieldValue.increment(1)
        });

        // --- Trigger Notifications (on a separate function) ---
        // This function would be triggered by the `onCreate` of a booking document.
        // For now, we just return success.

        return { status: 'success', bookingId: bookingRef.id };

    } catch (error: any) {
        functions.logger.error('Error in createBooking:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'An unexpected error occurred while creating the booking.');
    }
});
