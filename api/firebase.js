/* eslint-disable */
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initFirebase = () => {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log(error);
  }
};

export const loginWithGoogleFirebaseApi = () => new Promise((resolve, reject) => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(response => resolve(response))
    .catch(error => reject(error));
})

export const loginWithFacebookFirebaseApi = () => new Promise((resolve, reject) => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(response => resolve(response))
    .catch(error => reject(error));
})

export default firebase;
