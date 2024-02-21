import React from 'react';
import  { useContext,useState,useEffect, useRef} from 'react';
import './Message.css';
import UsernameContext from '../../UsernameContext.js';
import { useParams, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, FormErrorMessage, Input, FormHelperText ,Button} from '@chakra-ui/react';
import { db } from '../../Firebase.js'; // Adjust the path accordingly
import { collection, addDoc, getDocs, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import { Formik, Form, Field } from 'formik';
import {PlanNameContext} from '../../UsernameContext.js';

function Message ()  {
    const { username } = useContext(UsernameContext);
    const { postId, planName } = useParams();
    const [comments, setComments] = useState({});
    const messageEndRef = useRef(null);
    const { setPlanName } = useContext(PlanNameContext);
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
      setPlanName(planName);
    
      let unsubscribe;
      async function fetchData() {
        try {
          const postsArray = [];
          const q = query(collection(db, 'Message'), where('planId', '==', postId));
          unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsForPost = [];
            snapshot.forEach((doc) => {
              commentsForPost.push({
                id: doc.id,
                ...doc.data()
              });
            });
            setComments(commentsForPost);

            scrollToBottom();
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
    
      fetchData();
      return () => unsubscribe && unsubscribe();
    }, [postId, planName]);
    
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  
    const handleSubmit = async (values) => {
      if (!values.message || typeof values.message !== 'string' || !values.message.trim()) {
          return alert('type something');
      }
  
      const comment = {
        user: username,
        message: values.message,
        planId:postId,
        plan:planName,
        timestamp: Timestamp.now(),
      };
      try {
        await addDoc(collection(db, "Message"), comment);
        scrollToBottom();

      } catch (error) {
        console.error("Error adding comment: ", error);
        alert('Failed to add comment. Please try again later.');
      }
    };
    const handleGoBack = () => {
      navigate('/');

    };
  
  return (
    <div className="message-container">
        <div className="comments-container">
        {Array.isArray(comments) && comments
      .sort((a, b) => a.timestamp - b.timestamp) // Sort comments by timestamp in ascending order
      .map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.user}:</strong> {comment.message}</p>
        </div>
      ))}
                      <div ref={messageEndRef}></div>

        </div>
        <div className="input-container">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            <Form className="form-container">
              <Field name='message'>
                {({ field, form }) => (
                  <FormControl>
                    <Input {...field} placeholder='Type here..' />
                  </FormControl>
                )}
              </Field>
              <Button colorScheme="blue" type="submit">
                Ok
              </Button>
            </Form>
          </Formik>
          <Button onClick={handleGoBack} colorScheme="blue" mt={4}>
          Exit from plan
        </Button>
        </div>

      </div>
    );
};

export default Message;