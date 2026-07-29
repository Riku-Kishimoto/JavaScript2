// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // ここに、コンソールでコピーした設定を貼り付ける
  apiKey: "AIzaSyAE-s6TjUWTzC4_9Rfuul9HlAfUk1V0M1w",
  authDomain: "react-ecsite-5351e.firebaseapp.com",
  projectId: "react-ecsite-5351e",
  storageBucket: "react-ecsite-5351e.firebasestorage.app",
  messagingSenderId: "740174534879",
  appId: "1:740174534879:web:017d360241279a1730716a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
