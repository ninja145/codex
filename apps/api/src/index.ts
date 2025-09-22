import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as auth from './auth';
import * as booking from './booking';
import * as ba from './ba';

admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Export auth functions
export const doctorSignup = auth.doctorSignup;
export const doctorLogin = auth.doctorLogin;
export const generatePinResetCode = auth.generatePinResetCode;
export const verifyPinResetCode = auth.verifyPinResetCode;

// Export booking functions
export const createBooking = booking.createBooking;

// Export BA auth functions
export const baSignup = auth.baSignup;
export const baLogin = auth.baLogin;

// Export BA business logic functions
export const checkBaDeactivation = ba.checkBaDeactivation;
