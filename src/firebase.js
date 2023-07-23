import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDffJAsSSeg44VSxY25ZLCDRshQ-zM7H9A",
  authDomain: "clone-d7381.firebaseapp.com",
  projectId: "clone-d7381",
  storageBucket: "clone-d7381.appspot.com",
  messagingSenderId: "323901282419",
  appId: "1:323901282419:web:43d251189e575bd23ab206",
  measurementId: "G-JFP2PLM0NB"
  };

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
