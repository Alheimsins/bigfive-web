import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyArRl-ACgndHeRUqXWZjORHg5dxbZFlwwA",
  authDomain: "sophonaut-b5.firebaseapp.com",
  projectId: "sophonaut-b5",
  storageBucket: "sophonaut-b5.appspot.com",
  messagingSenderId: "750536694776",
  appId: "1:750536694776:web:8e1943e97ba5b552c8140d",
  measurementId: "G-E2CGV270CF"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;