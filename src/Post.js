import './Post.css';
import React, { useState, useEffect, useRef } from 'react';
import { db } from './Firebase'; // Adjust the path accordingly
import { collection, addDoc, getDocs, Timestamp, query, where } from "firebase/firestore"; // Import Timestamp and query from Firestore
import { Formik, Form, Field } from 'formik';

function Post({ name }) {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [comments, setComments] = useState({});
    const [showCommentsForPost, setShowCommentsForPost] = useState(null);

    useEffect(() => {
        setCurrentUser(name);
    }, [name]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = [];

                querySnapshot.forEach((doc) => {
                    const post = {
                        id: doc.id,
                        user: doc.data().user.username,
                        title: doc.data().title,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate() : null // Convert the timestamp to a JavaScript Date object if it exists
                    };
                    postsArray.push(post);
                });

                setPosts(postsArray);
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        }

        fetchPosts();
    }, []);

    const handleSubmitComment = async (values, postId) => {
        // Handle empty comment handling
        if (!values.comment.trim()) {
            return alert('Please enter a comment');
        }

        // Create a new comment object with `post.id`, user data (if applicable), and content
        const comment = {
            postId: postId,
            userId: currentUser, // Store user ID if authenticated
            content: values.comment,
            timestamp: Timestamp.now(),
        };

        // Add the comment to the `comments` collection
        await addDoc(collection(db, "comments"), comment);
    };

    const handleShowComments = async (postId) => {
        try {
            const q = query(collection(db, 'comments'), where('postId', '==', postId));
            const querySnapshot = await getDocs(q);
            const commentsForPost = [];

            querySnapshot.forEach((doc) => {
                commentsForPost.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setComments(prevState => ({
                ...prevState,
                [postId]: commentsForPost
            }));
            setShowCommentsForPost(postId);
        } catch (error) {
            console.error("Error getting comments for post: ", error);
        }
    };

    return (
        <div className="post-container">
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h2 className="heading">{post.title}</h2>
                    {post.timestamp && (
                        <div className="date">
                            <span>{formatDate(post.timestamp)}</span>
                        </div>
                    )}
                    <div className="name">
                        <span>by {post.user}</span>
                    </div>
                    <p>{post.content}</p>
                    <button onClick={() => handleShowComments(post.id)}>Show Comments</button>
                    {showCommentsForPost === post.id && comments[post.id] && (
                        <div>
                            <h3>Comments:</h3>
                            {comments[post.id].map(comment => (
                                <div key={comment.id}>
                                    <p>{comment.content}</p>
                                    <p>by {comment.userId.name}</p>
                                    <p>{formatDate(comment.timestamp)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <Formik
                        initialValues={{ comment: '' }}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmitComment(values, post.id);
                            resetForm();
                        }}
                    >
                        <Form>
                            <Field
                                as="textarea"
                                name="comment"
                                placeholder="Add your comment..."
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
            ))}
        </div>
    );
}

function formatDate(date) {
  if (!date || !(date instanceof Date)) {
      return ''; // Return empty string or handle the case as needed
  }
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}
export default Post;
