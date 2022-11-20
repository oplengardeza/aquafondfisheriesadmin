import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_EVz1vpdcFkUXrsZth6IejQ7J-4j2vhI",
  authDomain: "aquafongfisheries.firebaseapp.com",
  projectId: "aquafongfisheries",
  storageBucket: "aquafongfisheries.appspot.com",
  messagingSenderId: "479940922928",
  appId: "1:479940922928:web:155ed9c494315e7583e7f5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
