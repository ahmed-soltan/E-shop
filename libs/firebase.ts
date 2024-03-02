// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxmRvmsqLCip6svfGg5SlUUS4hZ340Qo8",
  authDomain: "e-shop-19020.firebaseapp.com",
  projectId: "e-shop-19020",
  storageBucket: "e-shop-19020.appspot.com",
  messagingSenderId: "1043188713905",
  appId: "1:1043188713905:web:af4c730ae14bbe3aac5590"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;