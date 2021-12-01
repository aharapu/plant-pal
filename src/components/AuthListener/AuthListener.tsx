import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { JsxElement } from 'typescript';

/*
  The purpose of this component is to redirect to home when authorised
  and redirect to login screen when unauthorised.
*/
export function AuthListener(props: { children: ReactElement<any, any> }) {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // TODO -> put all routes in a routes file
        navigate('/home');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
      } else {
        navigate('/signin');
        // User is signed out
        // ...
      }
    });
    return () => {
      // remove authchangedlistener
    };
  }, []);
  const { children } = props;
  return children;
}
