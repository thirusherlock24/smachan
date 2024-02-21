
import React, { useEffect, useState } from 'react';
import { collection,  Timestamp,getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly
import './Feeds.css'; // Import the CSS file



function FetchPlanName()
{
    
    const[posts,setPosts]=useState([]);
    
    
    useEffect(() => {
        async function fetchData() {
          try {
            const postsSnapshot = await getDocs(collection(db, "planName"));
            const postsArray = [];
            postsSnapshot.forEach((doc) => {
              const post = {
                id: doc.id,
                planName: doc.data().planName,
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
      return posts;
}
export default FetchPlanName;