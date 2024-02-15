import './Signup.css';
import { collection, addDoc,getDocs, getFirestore } from "firebase/firestore"; 
import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, FormHelperText, Button } from '@chakra-ui/react';
import { app, db } from './Firebase'; // Adjust the path accordingly
import { Link, Route, Routes} from 'react-router-dom';
import SignupFunctions from './SignupFunctions'; // Import the SignupFunctions component

function Signup() {
  const { validateName, validateNumOrEmail, validateuserName, validatepassword, handleSubmit } = SignupFunctions(); // Destructure the functions from SignupFunctions
  
    return (
      <div className="container">
        <div className="form-container">
          <img src="/logo.png" alt="SM" className = "logo"/>
      <Formik
     initialValues={{ fullName: '', numoremail: '', userName: '', password: '' }}
      onSubmit={handleSubmit}
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
    <div className="switch">
    <p>Already have account?</p>
                <Link to='/'>
                 Signin
                </Link>
        </div>
    </div>
    </div>
    )
  
}

export default Signup;
