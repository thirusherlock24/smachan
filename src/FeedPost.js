
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from "formik";
import { collection, addDoc, Timestamp,getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly
import './Feeds.css'; // Import the CSS file
import FetchPlanName from './FetchPlanName.js';

import {Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';


function FeedPost({isOpen,onClose,userName})
{  const posts = FetchPlanName();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPlan,setSelectedPlan]=useState('');
    const timestamp = Timestamp.fromDate(new Date());

    const handleSubmit = async (values, actions) => {
        try {
          setIsSubmitting(true);
          await addDoc(collection(db, "posts"), {
            user: userName,
            title: values.title,
            content: values.content,
            timestamp: timestamp,
            plan:selectedPlan
          });
          console.log("Post submitted successfully!");
          setIsSubmitting(false);
          onClose();
          actions.resetForm(); // Reset the form upon successful submission
        } catch (error) {
          console.error("Error submitting post:", error);
          setIsSubmitting(false);
        }
      };

    const validateTitle = (value) => {
        if (!value) {
          return "Title is required";
        }
        return undefined;
      };
    
    const validateContent = (value) => {
        if (!value) {
          return "Content is required";
        }
        return undefined;
      };
    
    
      
return(
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create a New Post</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Formik initialValues={{ title: "", content: "" }} onSubmit={handleSubmit}>
          {props => (
            <Form>
              <Field name="title" validate={validateTitle}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.title && form.touched.title}>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder="Enter title" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="content" validate={validateContent}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.content && form.touched.content}>
                    <FormLabel>Content</FormLabel>
                    <Textarea {...field} placeholder="Enter content" />
                    <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Select placeholder="Select a plan" onChange={(e) => setSelectedPlan(e.target.value)}>
        {posts && posts.map(post => (
          <option key={post.id} value={post.planName}>{post.planName}</option>
        ))}
      </Select>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} type="submit" isLoading={props.isSubmitting}>
                  Submit
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </ModalContent>
  </Modal>
  
    )

}
export default FeedPost;