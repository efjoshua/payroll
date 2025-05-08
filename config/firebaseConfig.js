import { initializeApp, getApps } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAzexIk4ekNLE9GrsvBZ09pz4US2ORTbZY",
    authDomain: "academic-payroll.firebaseapp.com",
    projectId: "academic-payroll",
    storageBucket: "academic-payroll.firebasestorage.app",
    messagingSenderId: "780426360832",
    appId: "1:780426360832:web:63e3a33a3d0c80ef2440e5",
    measurementId: "G-BCBQFMTRN1"
  };
  

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app); // ✅ add this line

export { auth, db }; // ✅ also export db
