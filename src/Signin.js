import './Signup.css';
import { collection,getDocs } from "firebase/firestore"; 
import React, { useState,useContext } from 'react';
import { db } from './Firebase'; // Adjust the path accordingly
import { Link} from 'react-router-dom';
import Feeds from './Feeds';
import CustomModal from './ModalSignin.js';
import UsernameContext from './UsernameContext.js';
import { useEffect } from 'react';
import {PlanNameContext} from './UsernameContext.js';
import SigninForm from './SigninForm.js';


function Signin() {
    const { planName } = useContext(PlanNameContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fname, setFname] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {username} = useContext(UsernameContext);

  
    useEffect(() => {
      if (planName) {
        setFname(username);
        setIsAuthenticated(true);
        setShowModal(false);
      }
    }, [username]);
  
 
  
  const handleSubmit = async (values, actions) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let userFound = false;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().userName === values.userName && doc.data().password === values.password) {
          userFound = true;
          setFname(values.userName);

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
          <SigninForm handleSubmit={handleSubmit} />
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
