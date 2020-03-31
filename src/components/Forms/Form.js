import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import camelCase from 'camelcase';

import { StyledForm } from '../ContactForm/ContactFormStyles';
import TextField from './TextField';
import TextArea from './TextArea';
import Button, { ButtonStyles } from '../Button';
import Heading from '../Heading';


const Form = (props) => {
  const { fields, successMessage, title, submitText = "Send", styles, children, modal, cancel = false } = props;
  console.log(props);
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
    <StyledForm onSubmit={handleSubmit(onSubmit)} style={styles} modal={modal}>
      {title && <Heading>{title}</Heading>}
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
        {cancel && (
          <Button
            handleClick={cancel}
            className="cancel"
          >Cancel</Button>
        )}
      </fieldset>
      {children}
    </StyledForm>
  );
};

const Submit = styled.input`
  ${ButtonStyles}
  text-transform: none;
`;

export default Form;