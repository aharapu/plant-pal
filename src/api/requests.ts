import { getAuth } from '@firebase/auth';
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from '@firebase/firestore';
import { firebaseApp } from '../adapters/authentication';
import { Plant } from '../types';

export const getPlants = async () => {
  const { currentUser } = getAuth(firebaseApp);
  const uid = currentUser?.uid;

  // if (!uid) return null; // TODO -> user not logged in? throw error?

  const db = getFirestore(firebaseApp);

  const document = await getDoc(doc(db, `users/${uid}`));
  const plants: Plant[] = document.get('plants');

  if (!plants) throw new Error('This user does not have plants in his users/uid document.');

  return plants;
};

export const postPlant = async () => {
  // TODO -> extract to getUserUid() ?
  const { currentUser } = getAuth(firebaseApp);
  const uid = currentUser?.uid;

  if (!uid) return null; // TODO -> user not logged in? throw error?

  const db = getFirestore(firebaseApp);

  await updateDoc(doc(db, `users/${uid}`), {
    plants: arrayUnion('random = ' + Math.random() * 10),
  });

  return 'SUCCESS';
};
