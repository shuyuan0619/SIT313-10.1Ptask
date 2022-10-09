
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJG4Ehr0JULLdLtXgOIlsnNxxqUB4YRSo",
  authDomain: "wsytask.firebaseapp.com",
  projectId: "wsytask",
  storageBucket: "wsytask.appspot.com",
  messagingSenderId: "62800824297",
  appId: "1:62800824297:web:ab424b2be49a2a84fead78",
  measurementId: "G-X3XXGDM76E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default getFirestore();