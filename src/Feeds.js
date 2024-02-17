import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, FormErrorMessage, Input, Textarea, Button } from "@chakra-ui/react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly
import Post from './Post.js';
import './Feeds.css'; // Import the CSS file

function Feeds({userName}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values, actions) => {
    try {
      setIsSubmitting(true);
      const timestamp = Timestamp.fromDate(new Date());
      await addDoc(collection(db, "posts"), {
        user:userName,
        title: values.title,
        content: values.content,
        timestamp: timestamp,
      });
      console.log("Post submitted successfully!");
      setIsSubmitting(false);
      setIsFormVisible(false);
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

  return (
    <div className="form">
       {!isFormVisible && 
      <div className="feed-item">
       
          <input type="text" placeholder="What's on your mind" onClick={() => setIsFormVisible(true)} />
        
      </div>}
      {isFormVisible && (
        <div className="form-container">
          <h2>Create a New Post</h2>
          <Formik initialValues={{ title: "", content: "" }} onSubmit={handleSubmit}>
            {(props) => (
              <Form>
                <Field name="title" validate={validateTitle}>
                  {({ field, form }) => (
                    <FormControl className="form-field" isInvalid={form.errors.title && form.touched.title}>
                      <FormLabel className="form-label">Title</FormLabel>
                      <Input className="form-input" {...field} placeholder="Enter title" />
                      <FormErrorMessage className="error-message">{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="content" validate={validateContent}>
                  {({ field, form }) => (
                    <FormControl className="form-field" isInvalid={form.errors.content && form.touched.content}>
                      <FormLabel className="form-label">Content</FormLabel>
                      <Textarea className="form-textarea" {...field} placeholder="Enter content" />
                      <FormErrorMessage className="error-message">{form.errors.content}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button className="submit-button" mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
                <Button mt={4} colorScheme="red" ml={2} onClick={() => setIsFormVisible(false)}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div>
      {!isFormVisible && (
        <>
        {<Post userName={userName}/>} 
        </>)}
      </div>
    </div>
  );
}

export default Feeds;
