import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
// import camelCase from 'camelcase';
import classNames from 'classnames';
import { animated } from 'react-spring';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import Button, { ButtonStyles } from '../Button';
import Heading from '../Heading';
import Content from '../Content';

import FieldSwitcher from './FieldSwitcher';

import { encode } from '../utils';
import { media, grid } from '../theme';

const Form = ({
  fields,
  successMessage,
  title,
  submitText = 'Send',
  styles,
  children,
  modal,
  cancel = false,
  className,
  _rawDescription,
}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hookForm = useForm();
  const { register, handleSubmit, errors, control } = hookForm;

  const FormContext = React.createContext();

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

        trackCustomEvent({
          category: 'Forms',
          action: 'Form Submit',
          label: title,
          // value: 43
        });
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error(error);
      });
  };

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
          <FormContext.Provider
            value={{
              error,
              setError,
              success,
              setSuccess,
              loading,
              setLoading,
              register,
              errors,
              control,
            }}
          >
            <fieldset disabled={loading}>
              <div className="fieldset-flex-fix">
                {fields.map(field => {
                  return (
                    <FieldSwitcher
                      key={field._key}
                      field={field}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  );
                })}
                <label className="honeypot">
                  Don't fill this out if you're human:{' '}
                  <input name="honeypotField" />
                </label>
                <Submit type="submit" value={submitText} />
                {cancel && (
                  <Button handleClick={cancel} className="cancel">
                    Cancel
                  </Button>
                )}
              </div>
            </fieldset>
          </FormContext.Provider>
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
  }
  ${grid.enabled`
    .fieldset-flex-fix {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
    }
  `}
  .field-address {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
  .complex-field-label {
    font-family: synthese, sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    line-height: 2.15;
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
    text-transform: uppercase;
    display: block;
    grid-column: span 2;
    width: 50%;
    ::after {
      content: '';
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.orange};
      display: block;
    }
  }
  input[type='submit'] {
    margin-right: 1rem;
    grid-column: span 2;
    justify-self: start;
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
