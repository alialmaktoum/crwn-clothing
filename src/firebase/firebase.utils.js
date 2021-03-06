import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDV82jM1D0S7uFXNqK_f6gPATnViR1kOWc",
  authDomain: "crwn-db-8a009.firebaseapp.com",
  databaseURL: "https://crwn-db-8a009.firebaseio.com",
  projectId: "crwn-db-8a009",
  storageBucket: "crwn-db-8a009.appspot.com",
  messagingSenderId: "473597041974",
  appId: "1:473597041974:web:b4dfee7fe35b696e1a6797",
  measurementId: "G-G0MBFZVDN8",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
