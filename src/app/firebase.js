// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '************************************',
  authDomain: 'react-firebase-storage-ae047.firebaseapp.com',
  projectId: 'react-firebase-storage-ae047',
  storageBucket: 'react-firebase-storage-ae047.appspot.com',
  messagingSenderId: '1071019670975',
  appId: '1:1071019670975:web:74cc537cd214fb923a750a',
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
