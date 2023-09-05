// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByDoWoZvxxMwHKUn4GZHCVURmns6T_jFQ",
  authDomain: "hr-management-system-c975e.firebaseapp.com",
  projectId: "hr-management-system-c975e",
  storageBucket: "hr-management-system-c975e.appspot.com",
  messagingSenderId: "577753055340",
  appId: "1:577753055340:web:58d136c79da16601e5d849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
