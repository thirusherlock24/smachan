import './Post.css';
import React, { useState, useEffect } from 'react';
import { db } from './Firebase'; // Adjust the path accordingly
import { collection, addDoc, getDocs, Timestamp, query, where, onSnapshot } from "firebase/firestore"; // Import Timestamp, query, and onSnapshot from Firestore
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
import { Formik, Form, Field } from 'formik';

function Post({ userName }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    
     
  
    async function fetchData() {
      try {
        const postsSnapshot = await getDocs(collection(db, "posts"));
        const postsArray = [];
        postsSnapshot.forEach((doc) => {
          const post = {
            id: doc.id,
            user: doc.data().user,
            title: doc.data().title,
            content: doc.data().content,
            timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate() : null,
            plan:doc.data().plan
          };
          postsArray.push(post);
        });
        setPosts(postsArray);

        // Set up real-time listener for comments
        postsSnapshot.forEach(doc => {
          const postId = doc.id;
          const q = query(collection(db, 'comments'), where('postId', '==', postId));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsForPost = [];
            snapshot.forEach((doc) => {
              commentsForPost.push({
                id: doc.id,
                ...doc.data()
              });
            });
            setComments(prevState => ({
              ...prevState,
              [postId]: commentsForPost
            }));
          });
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmitComment = async (values, postId) => {
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

  const handleShowComments = (postId) => {
    setSelectedPostId(postId);
    setShowModal(true);
  };

  return (
    <div className="post-container">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2 className="heading">{post.title}</h2>
          {post.timestamp && (
            <div className="date">
              <span>{formatDate(post.timestamp)}</span>
              <span></span>
            </div>
          )}
          <div className="name">
            <span>{post.user}</span>
            {post.plan && <span>--plan: {`{${post.plan}}`}</span>}
          </div>
          <p>{post.content}</p>
          <Button mt={2} colorScheme="blue" onClick={() => handleShowComments(post.id)}>Comments</Button>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Comments</ModalHeader>
              <ModalCloseButton />
              <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ marginBottom: '40px' }}>
    {comments[selectedPostId] && comments[selectedPostId]
      .sort((a, b) => a.timestamp - b.timestamp) // Sort comments by timestamp in ascending order
      .map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.user}:</strong> {comment.content}</p>
        </div>
      ))}
  </div>

  <div style={{ display: 'flex', marginTop: 'auto' }}>
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(values, { resetForm }) => {
        handleSubmitComment(values, selectedPostId);
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

 
</ModalBody>

              <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
                <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </div>
  );
}

function formatDate(date) {
  if (!date || !(date instanceof Date)) {
    return '';
  }
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default Post;
