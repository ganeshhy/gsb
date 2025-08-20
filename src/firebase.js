// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDZZL3QHaEp5sDE1C2-VuXIWys47s5OHE",
  authDomain: "gsb-community-app-80b47.firebaseapp.com",
  projectId: "gsb-community-app-80b47",
  storageBucket: "gsb-community-app-80b47.firebasestorage.app",
  messagingSenderId: "260357126234",
  appId: "1:260357126234:web:f7ed6a27a7f67dc8d4c063"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
