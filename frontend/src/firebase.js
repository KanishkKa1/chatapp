import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCf94V-iO49WvWmBq11aN-j5NVLNauUe-8",
    authDomain: "chatapp-60d63.firebaseapp.com",
    projectId: "chatapp-60d63",
    storageBucket: "chatapp-60d63.appspot.com",
    messagingSenderId: "895197156202",
    appId: "1:895197156202:web:04775c56d76d2202ed0b13",
    measurementId: "G-2PHPNEVLQZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default firestore;
