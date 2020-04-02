import React, { useState } from 'react';
import styled from 'styled-components';
import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const CheckBoxes = ({ name, options, register, fieldOptions, error }) => {
  const [checked, setChecked] = useState([]);

  const required =
    fieldOptions && fieldOptions.required ? fieldOptions.required : false;

  const halfWidth =
    fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;

  const toggleChecked = i => {
    console.log('toggleChecked', i, checked);
    if (!checked.includes(i)) {
      console.log('box is not checked');
      setChecked([...checked, i]);
    } else {
      setChecked(checked.filter(x => x !== i));
    }
  };

  // Focus State
  const [focused, setFocus] = useState(false);
  const handleFocus = e => {
    setFocus(true);
  }
  const handleBlur = e => {
    if (!e.target.value) {
      setFocus(false);
    }
  }



  return (
    <>
      <Label
        className="checkboxes"
        htmlFor={camelCase(name)}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <CheckboxesContainer
          className="checkboxes-container"
          halfWidth={halfWidth}
        >
          {options.map((option, i) => (
            <span
              className="checkbox-wrapper"
              key={camelCase(option)}
              onClick={() => toggleChecked(i)}
            >
              <input
                onChange={() => toggleChecked(i)}
                className="checkbox"
                type="checkbox"
                checked={checked.includes(i)}
                name={camelCase(name)}
                value={camelCase(option)}
                ref={register({
                  required
                })}
              />
              <span className="checkbox-option-label">{option}</span>
            </span>
          ))}
        </CheckboxesContainer>
      </Label>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

const CheckboxesContainer = styled.div`
  columns: ${({ halfWidth }) => (halfWidth ? 1 : 2)};
  padding: 1rem;
  .checkbox-wrapper {
    display: block;
    cursor: pointer;
    position: relative;
  }
  .checkbox {
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }

  .checkbox-option-label {
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
      border-radius: 25%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .checkbox:focus + span {
    outline-color: ${({ theme }) => theme.orange};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  .checkbox:checked + span::before {
    background: ${({ theme }) => theme.orange};
  }
`;

export default CheckBoxes;
