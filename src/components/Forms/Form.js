import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import camelCase from 'camelcase';

import { StyledForm } from '../ContactForm/ContactFormStyles';
import TextField from './TextField';

const Form = ({ fields, successMessage }) => {

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    setSuccess(true);
  }

  return success ? (
    <p>{successMessage}</p>
  ) : (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
            return null;
          }
        })}
      </fieldset>
    </StyledForm>
  );
};

export default Form;