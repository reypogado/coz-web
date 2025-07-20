// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAQZ9uooCdO01qCkoiB2PM0_4Nrh8J3sw",
  authDomain: "coz-coffee.firebaseapp.com",
  projectId: "coz-coffee",
  storageBucket: "coz-coffee.firebasestorage.app",
  messagingSenderId: "554365836836",
  appId: "1:554365836836:web:e379c21b0a1b2ddb83c2b1",
  measurementId: "G-EVSYC4D78P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);