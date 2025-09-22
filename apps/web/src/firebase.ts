import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const functions = getFunctions(app, 'asia-south1'); // Example region, adjust as needed
export const db = getFirestore(app);

// Export callable functions
export const doctorSignup = httpsCallable(functions, 'doctorSignup');
export const doctorLogin = httpsCallable(functions, 'doctorLogin');
export const generatePinResetCode = httpsCallable(functions, 'generatePinResetCode');
export const verifyPinResetCode = httpsCallable(functions, 'verifyPinResetCode');
export const createBooking = httpsCallable(functions, 'createBooking');

// BA callable functions
export const baSignup = httpsCallable(functions, 'baSignup');
export const baLogin = httpsCallable(functions, 'baLogin');
