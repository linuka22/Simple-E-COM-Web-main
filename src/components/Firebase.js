import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAQQ4ZG9PX8pBcBL-ESvco9F0iVbA9Cod0",
    authDomain: "ecomwebapp-ab75a.firebaseapp.com",
    projectId: "ecomwebapp-ab75a",
    storageBucket: "ecomwebapp-ab75a.firebasestorage.app",
    messagingSenderId: "706036229355",
    appId: "1:706036229355:web:a108763f475ff2e977caae",
    measurementId: "G-ZQQ9VZD9X1"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);



export { app, db, auth  };