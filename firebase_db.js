// import firebase from "firebase" --> v.8 firebase
import { initializeApp } from "firebase/app"; //v.9 firebase
import { getFirestore } from "firebase/firestore"; //v.9 firebase

const firebaseConfig = {
  apiKey: "AIzaSyD8Hd5b5vH4-D43fUwEzSfWHSMzEHFs1No",
  authDomain: "clone-31aa5.firebaseapp.com",
  projectId: "clone-31aa5",
  storageBucket: "clone-31aa5.appspot.com",
  messagingSenderId: "972184727106",
  appId: "1:972184727106:web:6c9f01623c99f2d11dc7db",
};

// const app = !firebase.apps.length?firebaseConfig.initializeApp(firebaseConfig):firebase.app() --> v.8 firebase

const app = initializeApp(firebaseConfig);

// const db=app.firestore()
const db = getFirestore(app);

export default db;
