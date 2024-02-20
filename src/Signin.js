import './Signup.css';
import { collection,getDocs } from "firebase/firestore"; 
import React, { useState,useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, FormHelperText } from '@chakra-ui/react';
import { db } from './Firebase'; // Adjust the path accordingly
import { Link} from 'react-router-dom';
import Feeds from './Feeds';
import CustomModal from './ModalSignin.js';
import UsernameContext from './UsernameContext.js';
import { useEffect } from 'react';
import {PlanNameContext} from './UsernameContext.js';

import {
  Button
} from "@chakra-ui/react";

  // Use setUsernameValue to set the username where needed



function Signin() {
    const { planName } = useContext(PlanNameContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fname, setFname] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {username} = useContext(UsernameContext);
    const { setUsername } = useContext(UsernameContext);

  
    useEffect(() => {
      if (planName) {
        setFname(username);
        setIsAuthenticated(true);
        setShowModal(false);
      }
    }, [username]);
  
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
    return undefined;
  }
  
  
  const handleSubmit = async (values, actions) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let userFound = false;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().userName === values.userName && doc.data().password === values.password) {
          userFound = true;
          setFname(values.userName);
          setUsername(values.userName);

        }
      });
  
      if (userFound) {
        // Perform actions upon successful authentication, e.g., redirect
        console.log('Authentication successful');
        setIsAuthenticated(true);
        setShowModal(true);

      } else {
        // Handle authentication failure, e.g., show an error message
        console.log('Authentication failed');
      }
    } catch (e) {
      console.error("Error retrieving documents: ", e);
    }
  };
  
    return (
        <div>
            {(!isAuthenticated)&&(
        <div className="container">
        <div className="form-containers">
          <img src="/logo.png" alt="SM" className = "logo"/>
      <Formik
     initialValues={{userName: '', password: '' }}
      onSubmit={handleSubmit}
    >{(props) => (

      <Form>

      <Field name='userName' validate={validateuserName} >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.userName && form.values.userName}>
              <FormLabel>
                userName {!form.errors.userName && form.touched.userName ? '' : '*'}
                </FormLabel>
              <Input {...field} placeholder='userName' />
             
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
    <p>Don't have account?</p>
                <Link to='/Signup'>
                 Signup
                </Link>
        </div>
    </div>
    </div>
    )}
      {isAuthenticated && <CustomModal isOpen={showModal} onClose={() => setShowModal(false)} fname={fname} />}

     {isAuthenticated && !showModal && <Feeds userName={fname}/>}

    </div>
    );
  
}

export default Signin;
