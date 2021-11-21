import { useState } from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

export function UnauthorizedHome() {
  const [value, setValue] = useState(getEmptyFormState());

  return (
    <Box direction='row' justify='center' align='center' fill>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onReset={() => setValue(getEmptyFormState())}
        onSubmit={({ value }) => {
          console.log('submit this: ', value);
        }}
      >
        <FormField name='username' htmlFor='username' label='Username'>
          <TextInput name='username' autoComplete='off' />
        </FormField>
        <FormField name='password' htmlFor='password' label='Password' margin='0 0 30px'>
          <TextInput id='password' name='password' type='password' autoComplete='off' />
        </FormField>
        <Box direction='row' justify='end' gap='medium'>
          <Button type='submit' primary label='Login' />
        </Box>
      </Form>
    </Box>
  );
}

function getEmptyFormState() {
  return {
    username: '',
    password: '',
  };
}
