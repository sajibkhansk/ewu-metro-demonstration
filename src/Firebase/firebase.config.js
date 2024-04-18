// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYkjj-yPAR2cRc8h-w4EAaMRy91OCxOvw",
  authDomain: "metro-rail-ewu.firebaseapp.com",
  projectId: "metro-rail-ewu",
  storageBucket: "metro-rail-ewu.appspot.com",
  messagingSenderId: "417480564518",
  appId: "1:417480564518:web:d75b25740d1b561a71abe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;