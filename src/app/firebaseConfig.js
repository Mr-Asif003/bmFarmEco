// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuEiYSUShCuf2QddqAiFYS5RftT_3LOq0",
  authDomain: "farmeco-b2621.firebaseapp.com",
  projectId: "farmeco-b2621",
  storageBucket: "farmeco-b2621.firebasestorage.app",
  messagingSenderId: "976643524734",
  appId: "1:976643524734:web:92a5d349ee869c5d32f02f",
  measurementId: "G-MZ5ZT7L56Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
const auth = getAuth(app);
const db= getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

