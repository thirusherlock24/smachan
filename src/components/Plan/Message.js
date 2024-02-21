import './Message.css';
import UsernameContext from '../../UsernameContext.js';
import { useParams, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, FormErrorMessage, Input, FormHelperText ,Button} from '@chakra-ui/react';
import { db } from '../../Firebase.js'; // Adjust the path accordingly
import { collection, updateDoc, doc, addDoc, getDocs, Timestamp, query, where, onSnapshot,deleteField } from "firebase/firestore";
import { Formik, Form, Field } from 'formik';
import {PlanNameContext} from '../../UsernameContext.js';
import React, { useContext, useState, useEffect, useRef } from 'react';


function Message() {
  const { username } = useContext(UsernameContext);
  const { postId, planName } = useParams();
  const [comments, setComments] = useState({});
  const messageEndRef = useRef(null);
  const { setPlanName } = useContext(PlanNameContext);
  const navigate = useNavigate();
  const { status } = useParams(); // Retrieve the status parameter from the URL

  const isSuccess = status === 'success';
  const isOngoing = status === 'ongoing';
  console.log(isSuccess,isOngoing,status);
  useEffect(() => {
    setPlanName(planName);

    let unsubscribe;
    async function fetchData() {
      try {
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
      planId: postId,
      plan: planName,
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

  const handleSuccess = async () => {
    try {
      const planDocRef = doc(db, "planName", postId);
      await updateDoc(planDocRef, {
        success: 1
      });
      alert('all the best');
      navigate('/');
    } catch (error) {
      console.error("Error updating plan name: ", error);
      alert('Failed to update plan name. Please try again later.');
    }
  };
  const handleOngoing = async () => {
    try {
      const planDocRef = doc(db, "planName", postId);
      await updateDoc(planDocRef, {
        success: deleteField()
      });
      alert('Start planning, again!');
      navigate('/');
    } catch (error) {
      console.error("Error updating plan name: ", error);
      alert('Failed to update plan name. Please try again later.');
    }
  };

  return (
    <div className="message-container">
      <div className="comments-container">
        {Array.isArray(comments) && comments
          .sort((a, b) => a.timestamp - b.timestamp)
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
  {isOngoing ? (
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
      <Button onClick={handleSuccess}  style={{ marginLeft: '40px', }}colorScheme="blue" mt={3}>
        Success
      </Button>
    </Form>
  ) : (
    <>
      <p>This chat is ended because the plan moved to success, turn to Ongoing?</p>
      <Button onClick={handleOngoing} colorScheme="blue" mt={3}>
        Ongoing
      </Button>
    </>
  )}
</Formik>

        <Button onClick={handleGoBack} style={{ marginLeft: '40px', }} colorScheme="blue" mt={4}>
          Exit from plan
        </Button>
      </div>
    </div>
  );
              } export default Message;