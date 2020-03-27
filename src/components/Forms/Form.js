import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import camelCase from 'camelcase';

import { StyledForm } from '../ContactForm/ContactFormStyles';
import TextField from './TextField';
import TextArea from './TextArea';
import { ButtonStyles } from '../Button';
import Heading from '../Heading';


const Form = ({ fields, successMessage, heading, submitText = "Submit", styles, children }) => {

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hookForm = useForm();
  console.log(hookForm);
  const { register, handleSubmit, errors } = hookForm;
  const onSubmit = async data => {
    setSuccess(true);
  }

  return success ? (
    <p>{successMessage}</p>
  ) : (
    <StyledForm onSubmit={handleSubmit(onSubmit)} styles={styles}>
      {heading && <Heading>{heading}</Heading>}
      <fieldset disabled={loading}>
        {fields.map(field => {
          if (field._type === 'textField' || field._type === 'emailField') {
            return (
              <TextField 
                {...field}
                key={field._key}
                register={register}
                error={errors[camelCase(field.name)]}
              />
            );
          }
          if (field._type === 'textArea') {
            return <TextArea 
              {...field}
              key={field._key}
              register={register}
              error={errors[camelCase(field.name)]}
            />
          }
          return null;
        })}
        <Submit type="submit" value={submitText} />
      </fieldset>
      {children}
    </StyledForm>
  );
};

const Submit = styled.input`
  ${ButtonStyles}
`;

export default Form;