// Import the functions you need from the SDKs you need 
// TODO: Add SDKs for Firebase products that you want to use
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAysX-ytRHGAwIjiuLc2TlEKOgfNRDV4As",
    authDomain: "store-typescript.firebaseapp.com",
    projectId: "store-typescript",
    storageBucket: "store-typescript.appspot.com",
    messagingSenderId: "369756692669",
    appId: "1:369756692669:web:a352387b12dd2afa81d7d4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    
const db = getFirestore()

const storage = getStorage()

export { app, db, storage }
