import { useState } from 'react';
import { Box, Button, Form, FormExtendedEvent, FormField, RadioButtonGroup, TextInput } from 'grommet';

import { createUserWithEmail, signInWithEmail } from '../../adapters/authentication';
import { Credentials } from '../../types';
import { RADIO_GROUP_OPTIONS, SIGN_IN, SIGN_UP } from './constants';

// TODO Add confirm password when selecting sign up
// TODO Add validation to form

export function UnauthorizedHome() {
  const [authAction, setAuthAction] = useState(SIGN_IN);
  const [credentials, setCredentails] = useState(getEmptyFormState());

  function handleSubmit({ value: credentials }: FormExtendedEvent<Credentials, Element>) {
    if (authAction === SIGN_UP) createUserWithEmail(credentials).catch(handleCreateUserError);
    if (authAction === SIGN_IN) signInWithEmail(credentials).catch(console.error);
  }

  // TODO -> avoid any
  function handleCreateUserError() {
    // TODO -> pop a toaster stating the error
  }

  return (
    <Box direction='row' justify='center' align='center' fill>
      <Box direction='column' justify='center' align='stretch' background='#e5f5e5' pad='medium'>
        <RadioButtonGroup
          name='auth-action'
          direction='row'
          margin={{ bottom: 'medium' }}
          options={RADIO_GROUP_OPTIONS}
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

function getEmptyFormState(): Credentials {
  return {
    email: '',
    password: '',
  };
}
