import React from 'react';
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
import { useContext ,useEffect} from 'react';
import UsernameContext from './UsernameContext.js';



function ModalSignin({ isOpen, onClose, fname }) {
  useEffect(() => {
  const { setUsername } = useContext(UsernameContext);
 setUsername(fname);
  },[]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome {fname}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            <h2 className='modal-heading'>This is SMachan,</h2>
            <p className='modal-heading'>For you and your sweetie friends, you can</p>
            <ul className='modal-list'>
              <li>Plan a trip</li>
              <li>Write the moments of your journey</li>
              <li>and Don't forget to share pics and videos</li>
            </ul>
          </>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Ok!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalSignin;
