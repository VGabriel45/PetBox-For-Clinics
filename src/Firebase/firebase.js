import firebase from "firebase/app";
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCsEmhvfroLmjw-qmXDPEc5_zF5Jh2jS8o",
  authDomain: "petbox-ca29a.firebaseapp.com",
  projectId: "petbox-ca29a",
  storageBucket: "petbox-ca29a.appspot.com",
  messagingSenderId: "993019437856",
  appId: "1:993019437856:web:a0c527b8aeb1051bf6ed45"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
