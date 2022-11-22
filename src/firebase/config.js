import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAPCu4g7iVoaETkigO854E6xb1xG4zO4U",
  authDomain: "globetraderx.firebaseapp.com",
  projectId: "globetraderx",
  storageBucket: "globetraderx.appspot.com",
  messagingSenderId: "436102594442",
  appId: "1:436102594442:web:8779f9a3bfbf1d8fead273"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, Auth }