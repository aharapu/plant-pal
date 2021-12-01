import React, { useState } from 'react';
import { Box, Button, Form, FormExtendedEvent, FormField, RadioButtonGroup, TextInput } from 'grommet';

import { createUserWithEmail, signInWithEmail } from '../../adapters/authentication';
import { Credentials } from '../../types';
import { RADIO_GROUP_OPTIONS, SIGN_IN, SIGN_UP } from './constants';
import { emailRegex, passwordRegex } from '../../constants';

export function UnauthorizedHome() {
  const [authAction, setAuthAction] = useState(SIGN_IN);
  const [formValues, setFormValues] = useState(getEmptyFormFields());
  const [formErrors, setFormErrors] = useState(getEmptyFormFields());

  function handleSubmit({ value: submittedForm }: FormExtendedEvent<Credentials, Element>) {
    const credentials: Credentials = { email: submittedForm.email, password: submittedForm.password };

    if (authAction === SIGN_UP) createUser(credentials);
    if (authAction === SIGN_IN) signInUser(credentials);
  }

  function createUser(credentials: Credentials) {
    if (!isFormValid()) {
      // TODO -> put a toaster ?
      return;
    }

    createUserWithEmail(credentials).catch(handleCreateUserError);
  }

  function signInUser(credentials: Credentials) {
    if (!isFormValid()) {
      // TODO -> put a toaster ?
      return;
    }

    signInWithEmail(credentials).catch(console.error);
  }

  function isFormValid() {
    let valid = true;
    const newErrors = getEmptyFormFields();
    const { email, password, confirmPassword } = formValues;

    if (!emailRegex.test(email)) {
      newErrors.email = 'This is not a valid email, friend!';
      valid = false;
    }
    if (authAction === SIGN_UP && !passwordRegex.test(password)) {
      newErrors.password = 'Please follow ze guidelines...';
      valid = false;
    }
    if (authAction === SIGN_UP && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match :(';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  }

  // TODO -> avoid any
  function handleCreateUserError() {
    // TODO -> pop a toaster stating the error
  }

  function resetErroAt(fieldName: string) {
    setFormErrors((prev) => ({ ...prev, [fieldName]: '' }));
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const action = event.target.value;

    setAuthAction(action);
    setFormValues(getEmptyFormFields());
    setFormErrors(getEmptyFormFields());
  }

  const formInfos = {
    password:
      authAction === SIGN_UP
        ? 'Password guidlines: minimum 8 characters including at least one of each:' +
          'uppercase letter, lowercase letter, digit and special character (#?!@$ %^&*-)'
        : '',
  };

  return (
    <Box direction='row' justify='center' align='center' fill>
      <Box
        direction='column'
        justify='center'
        align='stretch'
        background='#e5f5e5'
        pad='medium'
        style={{ maxWidth: 500 }}
      >
        <RadioButtonGroup
          name='auth-action'
          direction='row'
          margin={{ bottom: 'medium' }}
          options={RADIO_GROUP_OPTIONS}
          value={authAction}
          onChange={handleRadioChange}
        />
        <Form
          value={formValues}
          errors={formErrors}
          infos={formInfos}
          onChange={(nextValue) => setFormValues(nextValue)}
          onReset={() => setFormValues(getEmptyFormFields())}
          onSubmit={handleSubmit}
        >
          <FormField name='email' htmlFor='email' label='Email'>
            <TextInput name='email' autoComplete='off' onChange={() => resetErroAt('email')} />
          </FormField>
          <FormField name='password' htmlFor='password' label='Password' margin='0 0 30px'>
            <TextInput
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              onChange={() => resetErroAt('password')}
            />
          </FormField>
          {authAction === SIGN_UP && (
            <FormField name='confirmPassword' htmlFor='confirmPassword' label='Confirm Password' margin='0 0 30px'>
              <TextInput
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='off'
                onChange={() => resetErroAt('confirmPassword')}
              />
            </FormField>
          )}
          <Box direction='row' justify='end' gap='medium'>
            <Button type='submit' primary label={authAction} />
          </Box>
        </Form>
      </Box>
    </Box>
  );
}

function getEmptyFormFields() {
  return {
    email: '',
    password: '',
    confirmPassword: '',
  };
}
