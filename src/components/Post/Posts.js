import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, getDocs } from "firebase/firestore";
import PostItem from './PostItem';
import './Post.css';

function Posts({ userName }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');

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
            timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null,
            plan: doc.data().plan
          };
          postsArray.push(post);
        });
        setPosts(postsArray);
        setFilteredPosts(postsArray); // Initially set filtered posts to all posts
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }
    fetchData();
  }, []);

  const handlePlanClick = (planName) => {
    if (planName === selectedPlan) {
      setSelectedPlan('');
      setFilteredPosts(posts); // Reset filtered posts to all posts
    } else {
      setSelectedPlan(planName);
      const filtered = posts.filter(post => post.plan === planName);
      filtered.sort((a, b) => a.timestamp - b.timestamp); // Sort filtered posts
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post-name">
        <div className="plans-heading">
          <h1 className="plans-title">Plans</h1>
        </div>
        <ul>
          {/* Render post names here */}
          {[...new Set(posts.map(post => post.plan))].map(planName => (
            <li key={planName} onClick={() => handlePlanClick(planName)} className={planName === selectedPlan ? 'selected' : ''}>{planName}</li>
          ))}
        </ul>
      </div>
      <div className="post-container">
        {filteredPosts.map(post => (
          <PostItem key={post.id} post={post} userName={userName} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
