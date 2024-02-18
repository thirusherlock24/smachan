import React,{useState} from 'react';
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
import { Formik, Form, Field } from "formik";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly

function ModalPlan({isOpen, onClose, fname }) {
    const handleSubmit = async (values) => {
        if (!values.planName || typeof values.planName !== 'string' || !values.planName.trim()) {
            return alert('Name something');
        }
    
        const comment = {
          user: fname,
          planName: values.planName,
          timestamp: Timestamp.now(),
        };
        try {
          await addDoc(collection(db, "PlanName"), comment);
        } catch (error) {
          console.error("Error adding comment: ", error);
          alert('Failed to add comment. Please try again later.');
        }
      };
    return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome {fname}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
          <Formik
      initialValues={{ planName: '' }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      <Form style={{ padding: '10px', display: 'flex', width: '90%' }}>
        <Field
          as="input"
          name="planName"
          placeholder="Add a plan..."
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <Button colorScheme="blue" type="submit">
          Povoma
        </Button>
      </Form>
    </Formik>
          </>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPlan;
