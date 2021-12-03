import { getAuth, signOut } from 'firebase/auth';
import { PlantList } from '../../features/PlantList/PlantList';

export function AuthorizedHome() {
  //TODO -> add logout button? perhaps on some navbar

  function handleSignOut() {
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <div>
      <p>welcom home, authorised user</p>
      <button onClick={handleSignOut}>sign out</button>
      <PlantList />
    </div>
  );
}
