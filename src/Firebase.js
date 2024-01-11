// Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDvFYr3oet29u_vkwcZ6_YOlduxlGdJmfo",
    authDomain: "smachan-fab33.firebaseapp.com",
    projectId: "smachan-fab33",
    storageBucket: "smachan-fab33.appspot.com",
    messagingSenderId: "588522826873",
    appId: "1:588522826873:web:d2df3aa1451887f6df78a8",
    measurementId: "G-GHJLB9172M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db, analytics };



