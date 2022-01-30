// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFuQ3Ff4819uIItG-APyl1yd1yfDGxv5c",
  authDomain: "t-chat-simple.firebaseapp.com",
  projectId: "t-chat-simple",
  storageBucket: "t-chat-simple.appspot.com",
  messagingSenderId: "244844456420",
  appId: "1:244844456420:web:17dd83072c610e6e0ebff1",
  measurementId: "G-PDLW33V292",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;
