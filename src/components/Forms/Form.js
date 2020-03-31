import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import camelCase from 'camelcase';
import classNames from 'classnames';

import { StyledForm } from '../ContactForm/ContactFormStyles';
import TextField from './TextField';
import TextArea from './TextArea';
import Button, { ButtonStyles } from '../Button';
import Heading from '../Heading';

import { encode } from '../utils';


const Form = ({ fields, successMessage, title, submitText = "Send", styles, children, modal, cancel = false, className }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hookForm = useForm();
  const { register, handleSubmit, errors } = hookForm;
  const onSubmit = data => {
    setLoading(true);
    fetch('/not-real', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': title, ...data }),
    })
      .then(res => {
        console.log(res);
        setSuccess(true);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error(error);
      });
  }

  return (
    <StyledForm 
      className={classNames(className, 'form')} 
      onSubmit={handleSubmit(onSubmit)} 
      style={styles} 
      modal={modal} 
      data-netlify="true" 
      name={title} 
      netlify-honeypot="honeypotField"
    >
      {title && <Heading>{title}</Heading>} 
      {success ? (
        <p>{successMessage}</p>
      ) : (
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
          <label className="honeypot">
            Don't fill this out if you're human: <input name="honeypotField" />
          </label>
          <Submit type="submit" value={submitText} />
          {cancel && (
            <Button
              handleClick={cancel}
              className="cancel"
            >Cancel</Button>
          )}
        </fieldset>
      )}
      {children}
    </StyledForm>
  );
};

const Submit = styled.input`
  ${ButtonStyles}
  text-transform: none;
`;

export default Form;