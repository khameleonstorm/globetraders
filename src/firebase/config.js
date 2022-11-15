import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLFMUHU-wWwVx3c8ghuXm4n7HhOifnFOQ",
  authDomain: "globetraderz.firebaseapp.com",
  projectId: "globetraderz",
  storageBucket: "globetraderz.appspot.com",
  messagingSenderId: "915475878749",
  appId: "1:915475878749:web:5a38c0404b94492d88ceb4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, Auth }