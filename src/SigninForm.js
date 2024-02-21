// SigninForm.js
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react';

function SigninForm({ handleSubmit }) {
  function validatePassword(value) {
    if (!value || value.length < 8) {
      return 'Password should be 8 letters or more';
    }
    return undefined;
  }

  function validateUserName(value) {
    if (!value) {
      return 'Name is required';
    }
    return undefined;
  }

  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Field name='userName' validate={validateUserName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.userName && form.touched.userName}>
                <FormLabel>
                  UserName {!form.errors.userName && form.touched.userName ? '' : '*'}
                </FormLabel>
                <Input {...field} placeholder='UserName' />
                <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='password' type='password' validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel>
                  Password {!form.errors.password && form.touched.password ? '' : '*'}
                </FormLabel>
                <Input {...field} placeholder='Password' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            className="button"
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SigninForm;
