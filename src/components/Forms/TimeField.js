import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const TimeField = ({ name, register, fieldOptions, error, control }) => {
  const required =
    fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth =
    fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const adminLabel =
    fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;

  // Focus State
  const [focused, setFocus] = useState(false);
  const handleFocus = e => {
    setFocus(true);
  };
  const handleBlur = e => {
    if (e[0].target.tagName === 'INPUT') {
      if (!e[0].target.value) {
        setFocus(false);
      }
    }
    console.dir(e[0].target);
  };

  return (
    <>
      <TimeFieldLabel
        className="field-text field-time"
        isFocused={focused}
        htmlFor={adminLabel ? adminLabel : name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <Controller
          as={TimePicker}
          control={control}
          className="text-input"
          name={adminLabel ? adminLabel : name}
          // ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autocomplete="false"
        />
      </TimeFieldLabel>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

const TimeFieldLabel = styled(Label)`
  .react-time-picker {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem;
    &__wrapper {
      border: 0;
    }
    &__inputGroup {
      /* display: flex;
      align-items: center;
      justify-content: flex-start; */
      transition: 0.25s;
      opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
      &__input {
        flex: 1 0 auto;
        padding: 0 0.8rem;
        :invalid {
          background: transparent;
        }
      }
    }
    &__button {
    :enabled:hover .react-time-picker__button__icon,
    :enabled:focus .react-time-picker__button__icon {
      stroke: ${({ theme }) => theme.orange};
    }
  }
  select {
    color: ${({ theme }) => theme.dark};
  }
  input {
    margin-top: 0;
    letter-spacing: 0.9px;
  }

  .react-clock {
    &__face {
      border-color: ${({ theme }) => theme.orange};
    }
    &__minute-mark {
      &__body {
        background: ${({ theme }) => theme.orange};
      }
    }
    &__minute-hand {
      &__body {
        background: ${({ theme }) => theme.orange};
      }
    }
  }
`;

export default TimeField;
