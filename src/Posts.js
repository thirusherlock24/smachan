import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import { collection, addDoc, getDocs, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import PostItem from './PostItem';
import './Post.css';
function Posts({ userName }) {
  const [posts, setPosts] = useState([]);

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
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="post-container">
      {posts.map(post => (
        <PostItem key={post.id} post={post} userName={userName} />
      ))}
    </div>
  );
}

export default Posts;
