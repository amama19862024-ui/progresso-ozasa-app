// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// あなたのFirebase設定
const firebaseConfig = {
  apiKey: "AIzaSyA3CIViJgCoyP-WCs_YFAFchlLWKxoFM-Y",
  authDomain: "progresso-ozasa.firebaseapp.com",
  projectId: "progresso-ozasa",
  storageBucket: "progresso-ozasa.firebasestorage.app",
  messagingSenderId: "924703297034",
  appId: "1:924703297034:web:8cebcf3c37a71711e6d9f3",
  measurementId: "G-R4F5Q86WS3"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

export { db };
