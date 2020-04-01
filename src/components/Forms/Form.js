import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import camelCase from 'camelcase';
import classNames from 'classnames';
import { animated } from 'react-spring';


import TextField from './TextField';
import TextArea from './TextArea';
import CheckBoxes from './CheckBoxes';
import Button, { ButtonStyles } from '../Button';
import Heading from '../Heading';
import Content from '../Content';

import { encode } from '../utils';
import { media } from '../theme';

const Form = ({ fields, successMessage, title, submitText = "Send", styles, children, modal, cancel = false, className, _rawDescription }) => {
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
        <>
          {_rawDescription && <Content>{_rawDescription}</Content>}
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
              if (field._type === 'checkBoxes') {
                return (
                  <CheckBoxes
                    {...field}
                    key={field._key}
                    register={register}
                    error={errors[camelCase(field.name)]}
                  />
                );
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
        </>
      )}
      {children}
    </StyledForm>
  );
};

const Submit = styled.input`
  ${ButtonStyles}
  text-transform: none;
`;

const StyledForm = styled(animated.form)`
  background: ${props => props.theme.offWhite};
  /* overflow: hidden; */
  /* flex: 0 0 50%; */
  /* position: absolute; */
  /* left: 0; */
  /* bottom: 42px; */
  width: 100%;
  height: calc(100% - 42px);
  padding: ${props => (props.formOpen ? '0rem 2rem 4rem' : '0 2rem')};
  h1 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
  hr {
    width: 75px;
    margin-left: 0;
    border: 1.5px solid ${props => props.theme.orange};
  }
  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
  }
  button[type="submit"] {
    margin-right: 1rem;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
  ${media.break`
    /* max-height: 100vh; */
    /* position: static; */
    /* height: 100%; */
    hr {
      display: none;
    }
    h2 {
      padding: 1.5rem 1.2rem .5rem;
    }
    .cancel {
      display: none;
      display: ${({ modal }) => (modal ? 'initial' : 'none')};
    }
  `}
  .honeypot {
    display: none;
  }
`;

export default Form;