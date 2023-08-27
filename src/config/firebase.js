// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBZmkEF4RsByG6OceATHoBhpCkTizeQncQ",
    authDomain: "canteen-proj.firebaseapp.com",
    projectId: "canteen-proj",
    storageBucket: "canteen-proj.appspot.com",
    messagingSenderId: "421595010526",
    appId: "1:421595010526:web:45ddcf858e8cbc50ff394f",
    measurementId: "G-LMD12C5EKM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
