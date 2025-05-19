import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW4JLMVePOhdMjAZghJtYdNlYTkncC1_o",
  authDomain: "nuvdev-387cc.firebaseapp.com",
  projectId: "nuvdev-387cc",
  storageBucket: "nuvdev-387cc.firebasestorage.app",
  messagingSenderId: "473194577162",
  appId: "1:473194577162:web:7e1abc8e286b36b29b4ef3",
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
