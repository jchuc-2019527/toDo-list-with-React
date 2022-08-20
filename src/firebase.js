// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLbYp9EgMPgESYBNX6AJ94M6Kw828jmqY",
  authDomain: "react-todo-e7bfc.firebaseapp.com",
  projectId: "react-todo-e7bfc",
  storageBucket: "react-todo-e7bfc.appspot.com",
  messagingSenderId: "520538026482",
  appId: "1:520538026482:web:b4b1c9d8f82a71da82bb6b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
