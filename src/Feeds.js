import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from "formik";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./Firebase"; // Adjust the path accordingly
import Post from './Post.js';
import ModalPlan from './ModalPlan.js'; // Import the ModalPlan component
import './Feeds.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
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

function Feeds({ userName }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showText, setShowText] = useState(false);
  const [plan, setPlan] = useState('');
  const [modalPlanVar,setModalPlanVar]= useState(false)
  const [showModal, setShowModal] = useState(false);
 console.log(userName);
  const handleSubmit = async (values, actions) => {
    try {
      setIsSubmitting(true);
      const timestamp = Timestamp.fromDate(new Date());
      await addDoc(collection(db, "posts"), {
        user: userName,
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

  const planatrip = () => {
    if (plan.toLowerCase() === "plan a trip") {
      return (setShowModal(true)); // Render ModalPlan component if condition is met
    } else {
      alert('type error');
      return null; // or some other fallback
    }
  };

  return (
    <div className="form">
      <div>
        {<ModalPlan isOpen={showModal} onClose={() => setShowModal(false)} fname={userName} />}
        {
          <div className="All-icons">
            <div className="feed-item">
              <input
                type="text"
                placeholder="What's on your mind"
                onClick={() => setIsFormVisible(true)}
              />
            </div>
            <div className="button-group">
              <div className="button-contain">
                <FontAwesomeIcon
                  icon={faPlus}
                  onMouseEnter={() => setShowText(true)}
                  onMouseLeave={() => setShowText(false)}
                  style={{ cursor: 'pointer' }}
                />
                {showText && (
                  <div className="tooltip">
                    Add Photos and Videos
                  </div>
                )}
              </div>
              <div className="button-container">
                <input
                  type="text"
                  value={plan}
                  placeholder="Type: plan a trip"
                  onChange={(e) => setPlan(e.target.value)}
                />
                <button className="submit-plan" onClick={planatrip}> {/* onClick should call planatrip function */}
                  Submit
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <>

      <Modal isOpen={isFormVisible} onClose={() => setIsFormVisible(false)}>
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
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} type="submit" isLoading={props.isSubmitting}>
                      Submit
                    </Button>
                    <Button colorScheme="red" onClick={() => setIsFormVisible(false)}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
      <div>
        {!isFormVisible && (
          <>
            {<Post userName={userName} />}
          </>
        )}
      </div>
    </div>
  );
}

export default Feeds;

