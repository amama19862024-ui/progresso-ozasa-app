import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3CIViJgCoyP-WCs_YFAFchlLWKxoFM-Y",
  authDomain: "progresso-ozasa.firebaseapp.com",
  projectId: "progresso-ozasa",
  storageBucket: "progresso-ozasa.firebasestorage.app",
  messagingSenderId: "924703297034",
  appId: "1:924703297034:web:8cebcf3c37a71711e6d9f3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
