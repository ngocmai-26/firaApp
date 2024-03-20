import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCicEqeSZ1vqYK7sfHlk7V2rBzPP672rxU",
  authDomain: "food-app-a8666.firebaseapp.com",
  projectId: "food-app-a8666",
  storageBucket: "food-app-a8666.appspot.com",
  messagingSenderId: "641228464063",
  appId: "1:641228464063:web:377bef18f4058cd07f8b0a",
  measurementId: "G-ZN49JBTDPC",
};

const app = initializeApp(firebaseConfig);
export const FBStorage = getStorage(app);
