import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMU1kymSmwHazwoy0ksGPdoJgwX9ud_dA",
  authDomain: "vocabulary-2bcdd.firebaseapp.com",
  projectId: "vocabulary-2bcdd",
  storageBucket: "vocabulary-2bcdd.appspot.com",
  messagingSenderId: "393975743669",
  appId: "1:393975743669:web:0fd65c108e736940ae2afc",
  measurementId: "G-4430WGPK52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
