import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcLE1kGhhLK_nd5Ia7VLRkkGSU8UuJSoc",
  authDomain: "aquapond-fisheries.firebaseapp.com",
  projectId: "aquapond-fisheries",
  storageBucket: "aquapond-fisheries.appspot.com",
  messagingSenderId: "580323791062",
  appId: "1:580323791062:web:44cb687a4002e6b2997977"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
