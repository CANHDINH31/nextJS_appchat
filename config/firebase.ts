// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDddaeSE29D-zcwnzq59OJAoV_uucG0ml4",
  authDomain: "app-chat-7ca6a.firebaseapp.com",
  projectId: "app-chat-7ca6a",
  storageBucket: "app-chat-7ca6a.appspot.com",
  messagingSenderId: "343917701472",
  appId: "1:343917701472:web:f6e80996b3d7709c1fd605",
  measurementId: "G-ZYEVZ31TFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
