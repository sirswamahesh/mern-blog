// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d17c0.firebaseapp.com",
  projectId: "mern-blog-d17c0",
  storageBucket: "mern-blog-d17c0.appspot.com",
  messagingSenderId: "452590008866",
  appId: "1:452590008866:web:77ff87767b97a0a321687b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);