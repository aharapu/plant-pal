import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// TODO -> enable "named" imports ex. from '@local/config' from '@local/types'
import { firebaseConfig } from '../config/firebase'; // TODO -> replace with env vars
import { Credentials } from '../types';

initializeApp(firebaseConfig);

// TODO -> expose auth functions
export function createUserWithEmail(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('signed in as:', user);
      console.log('userCredentaial:', userCredential);
    })
    .catch((error) => {
      console.log(`error.code`, error.code);
      console.log(`error.message`, error.message);
    });
}

export function signInWithEmail(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('signed in as:', user);
      console.log('userCredentaial:', userCredential);
      // navigate('/home', { replace: true });
    })
    .catch((error) => {
      console.log(`error.code`, error.code);
      console.log(`error.message`, error.message);
    });
}

// TODO -> restrict access in DB using somthing similar to the following example
/*
https://cloud.google.com/firestore/docs/security/rules-query#secure_and_query_documents_based_on_authuid

The following security rule uses the request.auth and resource.data variables to restrict
read and write access for each story to its author:


service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{storyid} {
      // Only the authenticated user who authored the document can read or write
      allow read, write: if request.auth != null && request.auth.uid == resource.data.author;
    }
  }
}
 */
