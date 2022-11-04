import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXMcdp8D3sUFoxJdlsbYWvvABO0GMFv4I",
  authDomain: "aquafondfisheriesfinal.firebaseapp.com",
  projectId: "aquafondfisheriesfinal",
  storageBucket: "aquafondfisheriesfinal.appspot.com",
  messagingSenderId: "1085690628499",
  appId: "1:1085690628499:web:8eaaeb448efcdfacfa0066"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
