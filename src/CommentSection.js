import React, { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { Formik, Form, Field } from 'formik';
import { addDoc, Timestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from './Firebase';
import './Post.css';

function CommentSection({ postId, userName }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'comments'), (snapshot) => {
      const commentsForPost = snapshot.docs
        .filter(doc => doc.data().postId === postId)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsForPost);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, [postId]);

  const handleSubmitComment = async (values) => {
    if (!values.comment.trim()) {
      return alert('Please enter a comment');
    }

    const comment = {
      user: userName,
      postId: postId,
      content: values.comment,
      timestamp: Timestamp.now(),
    };
    try {
      await addDoc(collection(db, "comments"), comment);
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert('Failed to add comment. Please try again later.');
    }
  };

  return (
    <div style={{ marginBottom: '40px' }}>
     {comments && comments
      .sort((a, b) => a.timestamp - b.timestamp) // Sort comments by timestamp in ascending order
      .map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.user}:</strong> {comment.content}</p>
        </div>
      ))}
      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <Formik
          initialValues={{ comment: '' }}
          onSubmit={(values, { resetForm }) => {
            handleSubmitComment(values);
            resetForm();
          }}
        >
          <Form style={{ padding: '10px', display: 'flex', width: '90%' }}>
            <Field
              as="textarea"
              name="comment"
              placeholder="comment..."
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
            <Button colorScheme="blue" type="submit">
              Add
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CommentSection;
