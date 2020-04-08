import React, { useState } from 'react';
import styled from 'styled-components';
// import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const RadioButtons = ({ name, options, register, fieldOptions, error }) => {
  const [checked, setChecked] = useState(null);
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  return (
    <Label
      className="radiobuttons"
      htmlFor={name}
      halfWidth={halfWidth}
    >
      <span className="label-text">
        {name}
        {required && "*"}
      </span>
      <RadioButtonsContainer
        className="radio-buttons-container"
        halfWidth={halfWidth}
      >
        {options.map((option, i) => (
          <span
            className="radio-button-wrapper"
            key={option}
            onClick={() => setChecked(i)}
          >
            <input
              onChange={() => setChecked(i)}
              className="radio-button"
              type="radio"
              checked={checked === i}
              name={name}
              value={option}
              ref={register({
                required
              })}
            />
            <span className="radio-button-option-label">{option}</span>
          </span>
        ))}
      </RadioButtonsContainer>
      {error && <ErrorMessage error={error} />}
    </Label>
  );
};

const RadioButtonsContainer = styled.div`
  columns: ${({ halfWidth }) => (halfWidth ? 1 : 2)};
  padding: 1rem;
  .radio-button-wrapper {
    display: block;
    cursor: pointer;
  }
  .radio-button {
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }

  .radio-button-option-label {
    display: block;
    font-size: 1.4rem;
    /* font-weight: ${({ theme }) => theme.font.demibold}; */
    padding: 0.5rem;
    padding-left: 2rem;
    position: relative;

    ::before {
      content: '';
      background: transparent;
      border: 1px solid ${({ theme }) => theme.light};
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .radio-button:focus + span {
    outline-color: ${({ theme }) => theme.orange};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  .radio-button:checked + span::before {
    background: ${({ theme }) => theme.orange};
  }
`;

export default RadioButtons;
