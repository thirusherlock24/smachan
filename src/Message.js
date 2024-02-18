import React from 'react';
import  { useContext } from 'react';

import UsernameContext from './UsernameContext.js';
import { useParams } from 'react-router-dom';

function Message ()  {
    const { username } = useContext(UsernameContext);
    const { postId, planName } = useParams();

  return (
    <div className="message">
      <h2>hi{username}</h2>
      <h1>Post ID: {postId}</h1>
      <h2>Plan Name: {planName}</h2>
      {console.log(username)}
    </div>
  );
};

export default Message;