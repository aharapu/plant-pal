import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

// TODO -> enable "named" imports ex. from '@local/config' from '@local/types'
import { firebaseConfig } from '../config/firebase'; // TODO -> replace with env vars
import { Credentials, UserData } from '../types';

// TODO -> move to a firebase.js file, keep here only the actual auth methods
export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

// TODO -> expose auth functions
export async function createUserWithEmail(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = getAuth();

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  const uid = userCred.user.uid;
  const data: UserData = { plants: [] };

  if (userCred.user.email) {
    data.email = userCred.user.email;
  }

  await setDoc(doc(db, `users/${uid}`), data);
}

export async function signInWithEmail(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, email, password);
}
