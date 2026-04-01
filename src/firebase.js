import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyC07IX-3OMCvz25lIdOvBqyA2dGVpewhVE",
  authDomain: "em-orbita-7d535.firebaseapp.com",
  projectId: "em-orbita-7d535",
  storageBucket: "em-orbita-7d535.firebasestorage.app",
  messagingSenderId: "147712484222",
  appId: "1:147712484222:web:73cfd55122cd678406c92f",
  measurementId: "G-ZVWFXTKGZ9"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 