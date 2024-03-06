import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHf5i9oPOE8k152fs5P1JjXAaHfKv1glM',
  authDomain: 'wngc-scores.firebaseapp.com',
  databaseURL:
    'https://wngc-scores-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'wngc-scores',
  storageBucket: 'wngc-scores.appspot.com',
  messagingSenderId: '990005449038',
  appId: '1:990005449038:web:f77ac89cee94a6e421ce1f',
  measurementId: 'G-ZCWR9BZLNR',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}