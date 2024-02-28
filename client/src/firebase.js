// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "havenly-homes.firebaseapp.com",
  projectId: "havenly-homes",
  storageBucket: "havenly-homes.appspot.com",
  messagingSenderId: "287121652810",
  appId: "1:287121652810:web:852499ccbb1dd6e5bb7ab3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);