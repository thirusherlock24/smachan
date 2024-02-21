import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import CommentSection from './CommentSection';
import './Post.css';

function PostItem({ post, userName }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowComments = () => {
    setShowModal(true);
  };

  return (
    <div key={post.id} className="post">
      <h2 className="heading">{post.title}</h2>
      <div className="date">
        <span>{formatDate(post.timestamp)}</span>
      </div>
      <div className="name">
        <span>{post.user}</span>
        {post.plan && <span>--plan: {`{${post.plan}}`}</span>}
      </div>
      <p>{post.content}</p>
      <Button mt={2} colorScheme="blue" onClick={handleShowComments}>Comments</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
            <CommentSection postId={post.id} userName={userName} />
          </ModalBody>
          <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
            <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

function formatDate(date) {
  if (!date || !(date instanceof Date)) {
    return '';
  }
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default PostItem;
