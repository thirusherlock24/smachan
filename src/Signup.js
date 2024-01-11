import React from 'react';
import { Field, Form, Formik } from 'formik';
import './Signup.css';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Button,
  
} from '@chakra-ui/react';
function Signup() {
  const sampleName = ['thiru','priya'];
  function validateNumOrEmail(value)
  {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberPattern = /[0-9]{10}/;
    const isValid = emailPattern.test(value) || numberPattern.test(value);
    if (isValid) {
      return undefined;
    } else {
      return 'invalid mobile number or email';
        }
  }

  function validatepassword(value)
  {
  
   if(!value || value.length <8)
     {return 'password should be 8 letters or more';}
    else
   { return undefined ;}
  }
  function validateuserName(value) {
    if (!value) {
      return 'Name is required';
    }
  
    const isNameOccupied = sampleName.includes(value);
  
    if (isNameOccupied) {
      return 'Name occupied';
    }
  
    return undefined;
  }
  
  function validateName(value){
    if(value)
    return undefined;
    else 
    return 'error';

  }
    return (
      <div className="container">
        <div className="form-container">
      <Formik
      initialValues={{ name: '', comment: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert('all good');
          actions.setSubmitting(false);
        }, 1000);
      }}
    >{(props) => (

      <Form>
      <Field name='fullName' validate={validateName} >
      {({ field, form }) => (
    
      <FormControl >
      <FormLabel>
      fullName {!form.errors.fullName && form.touched.fullName ? '' : '*'}
 
        </FormLabel>
      <Input {...field} placeholder='fullName' />
      </FormControl>
      )}
      </Field>


      <Field name='numoremail' validate={validateNumOrEmail} >
      {({ field, form }) => (
     
      <FormControl isInvalid={form.errors.numoremail && form.values.numoremail } >
        <FormLabel>
          Mobile Number / Email {!form.errors.numoremail && form.touched.numoremail ? '' : '*'}
        </FormLabel>
        <Input {...field} placeholder='enter email or mobile number' />
        <FormErrorMessage>{form.errors.numoremail}</FormErrorMessage>
      </FormControl>
      )}
      </Field>
      

      <Field name='userName' validate={validateuserName} >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.userName && form.values.userName}>
              <FormLabel>
                userName {!form.errors.userName && form.touched.userName ? '' : '*'}
                </FormLabel>
              <Input {...field} placeholder='userName' />
              { (!form.errors.userName && form.touched.userName) &&(
                <FormHelperText>
                Name is available.
              </FormHelperText>
              )}
              <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        
      <Field name='password' type='password' validate={validatepassword} >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.values.password} >
              <FormLabel>
                password {!form.errors.password && form.touched.password ? '' : '*'}
                </FormLabel>
              <Input {...field} placeholder='password' />
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>


        <Button
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
    </div>
    </div>
    )
  
}

export default Signup;
