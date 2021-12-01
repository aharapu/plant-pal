import { useState } from 'react';
import { Box, Button, Form, FormExtendedEvent, FormField, RadioButtonGroup, TextInput } from 'grommet';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../config/firebase'; // TODO -> replace with env vars

initializeApp(firebaseConfig);

type credentials = { email: string; password: string };

const SIGN_IN = 'Sign In';
const SIGN_UP = 'Sign Up';

const radioGroupOptions = [
  {
    id: 'sign-in',
    label: SIGN_IN,
    value: SIGN_IN,
  },
  {
    id: 'sign-up',
    label: SIGN_UP,
    value: SIGN_UP,
  },
];

// TODO Add confirm password when selecting sign up
// TODO Add validation to form

export function UnauthorizedHome() {
  const [authAction, setAuthAction] = useState(SIGN_IN);
  const [credentials, setCredentails] = useState(getEmptyFormState());

  function handleSubmit({ value: credentials }: FormExtendedEvent<credentials, Element>) {
    if (authAction === SIGN_UP) createNewUser(credentials);
  }

  function createNewUser(credentials: credentials) {
    console.log(`creating user with`, credentials);
    const { email, password } = credentials;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      // TODO -> add a signIn handler function that redirects to home
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

  function signInUser(credentials: credentials) {
    const { email, password } = credentials;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
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

  return (
    <Box direction='row' justify='center' align='center' fill>
      <Box direction='column' justify='center' align='stretch' background='#e5f5e5' pad='medium'>
        <RadioButtonGroup
          name='auth-action'
          direction='row'
          margin={{ bottom: 'medium' }}
          options={radioGroupOptions}
          value={authAction}
          onChange={(event) => setAuthAction(event.target.value)}
        />
        <Form
          value={credentials}
          onChange={(nextValue) => setCredentails(nextValue)}
          onReset={() => setCredentails(getEmptyFormState())}
          onSubmit={handleSubmit}
        >
          <FormField name='email' htmlFor='email' label='Email'>
            <TextInput name='email' autoComplete='off' />
          </FormField>
          <FormField name='password' htmlFor='password' label='Password' margin='0 0 30px'>
            <TextInput id='password' name='password' type='password' autoComplete='off' />
          </FormField>
          <Box direction='row' justify='end' gap='medium'>
            <Button type='submit' primary label={authAction} />
          </Box>
        </Form>
      </Box>
    </Box>
  );
}

function getEmptyFormState() {
  return {
    email: '',
    password: '',
  };
}
