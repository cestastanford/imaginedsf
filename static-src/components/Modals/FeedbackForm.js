/*
* Imports.
*/

import React, { useState } from 'react';
import styled from 'styled-components';

import StyledButton from '../shared';


/*
* Defines the FeedbackForm component, which creates a new WP post
* when the feedback form is submitted.
*/

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || submitting || submitted) {
      return;
    }

    setSubmitting(true);
    await fetch('/wp-json/imaginedsf/feedback', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  let submitButtonText = 'Submit Feedback';
  if (submitting) {
    submitButtonText = 'Submitting...';
  }
  if (submitted) {
    submitButtonText = 'Submitted!';
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledTextArea
        className="textarea has-fixed-size"
        placeholder="Share your experience of Imagined San Francisco."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting || submitted}
      />
      <StyledButton
        type="submit"
        disabled={!message || submitting || submitted}
      >
        {submitButtonText}
      </StyledButton>
    </form>
  );
}


/*
* Styles for the FeedbackForm component.
*/

const StyledTextArea = styled.textarea`
  margin: 1em 0;
`;
