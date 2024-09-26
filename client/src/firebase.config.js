// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-15cb4.firebaseapp.com",
  projectId: "mern-blog-15cb4",
  storageBucket: "mern-blog-15cb4.appspot.com",
  messagingSenderId: "441776452917",
  appId: "1:441776452917:web:346795132c9e318677087c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);