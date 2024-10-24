// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8CSezwaQtbItdIxnw64Wa0jsfZXOP808",
    authDomain: "hair-d1f00.firebaseapp.com",
    projectId: "hair-d1f00",
    storageBucket: "hair-d1f00.appspot.com",
    messagingSenderId: "592411197694",
    appId: "1:592411197694:web:b8667ec7f838d3c875a5af",
    measurementId: "G-9GHV0P94LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };