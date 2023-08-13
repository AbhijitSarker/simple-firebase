// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1uFP5HlrS_o9zB-rMnsXcRKCBPAU7q_I",
    authDomain: "simple-firebase-101af.firebaseapp.com",
    projectId: "simple-firebase-101af",
    storageBucket: "simple-firebase-101af.appspot.com",
    messagingSenderId: "788056485741",
    appId: "1:788056485741:web:8e49e2d81948b5e512f464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;