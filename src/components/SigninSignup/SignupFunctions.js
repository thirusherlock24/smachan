import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { db } from '../../Firebase'; // Adjust the path accordingly
import {  useNavigate } from 'react-router-dom';

function SignupFunctions() {
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const names = querySnapshot.docs.map(doc => doc.data().userName);
        setUsernames(names);
      } catch (error) {
        console.error("Error retrieving documents: ", error);
      }
    };

    fetchData();
  }, []);

  function validateNumOrEmail(value) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberPattern = /[0-9]{10}/;
    const isValid = emailPattern.test(value) || numberPattern.test(value);
    return isValid ? undefined : 'Invalid mobile number or email';
  }

  function validatepassword(value) {
    return value && value.length >= 8 ? undefined : 'Password should be 8 characters or more';
  }

  function validateuserName(value) {
    if (!value) return 'Name is required';
    return usernames.includes(value) ? 'Name occupied, choose a different one' : undefined;
  }

  function validateName(value) {
    return value ? undefined : 'Name is required';
  }

  async function handleSubmit(values, actions) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fullName: values.fullName,
        numoremail: values.numoremail,
        userName: values.userName,
        password: values.password,
      });
      console.log("Document written with ID: ", docRef.id);
      alert('signup successfully');
      navigate('/');

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return { validateNumOrEmail, validatepassword, validateuserName, validateName, handleSubmit };
}

export default SignupFunctions;
