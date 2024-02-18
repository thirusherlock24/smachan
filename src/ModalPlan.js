import React,{useState,useEffect} from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, FormHelperText } from '@chakra-ui/react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { getDocs, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly
import Message from './Message'; // assuming Message.js is in the same directory
import { Link } from 'react-router-dom';

function ModalPlan({isOpen, onClose, fname }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

   
    useEffect(() => {
        async function fetchData() {
          try {
            const postsSnapshot = await getDocs(collection(db, "planName"));
            const postsArray = [];
            postsSnapshot.forEach((doc) => {
              const post = {
                id: doc.id,
                planName:doc.data().planName,
                timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate() : null
              };
              postsArray.push(post);
            });
            setPosts(postsArray);
        } catch (error) {
            console.error("Error getting documents: ", error);
          }
        }
    
        fetchData();
      }, []);
    
      
  
    const handleSubmit = async (values) => {
        if (!values.planName || typeof values.planName !== 'string' || !values.planName.trim()) {
            return alert('Name something');
        }
    
        const comment = {
          user: fname,
          planName: values.planName,
          timestamp: Timestamp.now(),
        };
        try {
          await addDoc(collection(db, "planName"), comment);
        } catch (error) {
          console.error("Error adding comment: ", error);
          alert('Failed to add comment. Please try again later.');
        }
      };
    return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome {fname}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
          <div className="plan-container">
      {posts.map(post => (
        <div key={post.id} className="plan">
  <h2 className="heading">
            <Link to={`/message/${post.id}/${post.planName}`}>{post.planName}</Link>
          </h2>          </div>
      ))}
      </div>
          <Formik
      initialValues={{ planName: '' }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      <Form style={{ padding: '10px', display: 'flex', width: '90%' }}>
      <Field name='planName' >
            {({ field, form }) => (
              <FormControl >
              <Input {...field} placeholder='Add a plan' />
            </FormControl>
          )}
        </Field>
        <Button colorScheme="blue" type="submit">
          Povoma
        </Button>
      </Form>
    </Formik>
          </>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPlan;
