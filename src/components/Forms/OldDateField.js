import React, { useState } from 'react';
// import camelCase from 'camelcase';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const DateField = ({ name, register, fieldOptions, error, _type }) => {
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
    if (!e.target.value) {
      setFocus(false);
    }
  };

  const [date, setDate] = useState();

  return (
    <>
      <DateTimeLabel
        className="field-text"
        isFocused={focused}
        htmlFor={adminLabel ? adminLabel : name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <DatePicker
          className="text-input date-field"
          name={adminLabel ? adminLabel : name}
          ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selected={date}
          onChange={date => setDate(date)}
        />
      </DateTimeLabel>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

const DateTimeLabel = styled(Label)`
  .react-datepicker-popper {
    width: 50%;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  input {
    cursor: pointer;
  }
  .react-datepicker {
    font-family: inherit;
    font-size: 1.2rem;
    background-color: #fff;
    color: inherit;
    border: 1px solid #aeaeae;
    border-radius: 0.3rem;
    display: inline-block;
    position: relative;
    width: 100%;
    &__header {
      background: ${({ theme }) => theme.orange};
      color: ${({ theme }) => theme.offWhite};
      border-bottom: 0;
    }
    &__navigation--previous {
      border-right-color: ${({ theme }) => theme.offWhite};
    }
    &__navigation--next {
      border-left-color: ${({ theme }) => theme.offWhite};
    }
    &__current-month {
      color: ${({ theme }) => theme.offWhite};
    }
    &__month-container {
      float: none;
    }
    &__day-name {
      color: ${({ theme }) => theme.offWhite};
      width: 23px;
      height: 20px;
    }
    &__day {
      width: 23px;
    }
    &__day--keyboard-selected,
    &__month-text--keyboard-selected,
    &__quarter-text--keyboard-selected {
      background: ${({ theme }) => theme.orange};
      &:hover {
        background: ${({ theme }) => theme.orange};
      }
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range {
      background: ${({ theme }) => theme.orange};
    }
  }
`;

export default DateField;
