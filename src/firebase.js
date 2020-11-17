import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyDXM9mNkcFgD9s2OhtNTa0U4S68qohTX5Y",
  authDomain: "instagram-mini-7d73b.firebaseapp.com",
  databaseURL: "https://instagram-mini-7d73b.firebaseio.com",
  projectId: "instagram-mini-7d73b",
  storageBucket: "instagram-mini-7d73b.appspot.com",
  messagingSenderId: "246858912479",
  appId: "1:246858912479:web:bbc756e7d598c17ee8cf6a",
  measurementId: "G-YDE2CDHJE7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export  {db, auth, storage};