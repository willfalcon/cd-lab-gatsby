import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight,
  faAngleRight,
  faAngleLeft,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Controller } from 'react-hook-form';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

import theme from '../theme';

const DateField = ({ name, fieldOptions, error, control }) => {
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
      <DateTimeLabel
        className="field-text"
        isFocused={focused || date}
        htmlFor={adminLabel ? adminLabel : name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <Controller
          as={DatePicker}
          control={control}
          className="text-input date-field"
          name={adminLabel ? adminLabel : name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          prevLabel={
            <FontAwesomeIcon
              icon={faAngleLeft}
              color={theme.offWhite}
              size="lg"
            />
          }
          prev2Label={
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              color={theme.offWhite}
              size="lg"
            />
          }
          nextLabel={
            <FontAwesomeIcon
              icon={faAngleRight}
              color={theme.offWhite}
              size="lg"
            />
          }
          next2Label={
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              color={theme.offWhite}
              size="lg"
            />
          }
        />
      </DateTimeLabel>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

const DateTimeLabel = styled(Label)`
  .react-date-picker {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem;
    &__wrapper {
      border: 0;
    }
  }
  .react-date-picker__inputGroup {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: 0.25s;
    opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
    &__input {
      flex: 1 0 auto;
      padding: 0;
    }
    &__year {
      flex: 2 0 auto;
    }
  }
  .react-date-picker__inputGroup__input:invalid {
    background: transparent;
  }
  .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
  .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
    stroke: ${({ theme }) => theme.orange};
  }
  input {
    margin-top: 0;
  }

  .react-calendar__tile {
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: ${({ theme }) => theme.boldWeight};
    &--now {
      background: ${({ theme }) => theme.offWhite};
      :enabled:hover {
        background: ${({ theme }) => theme.offWhite};
      }
    }
    &--active {
      background: ${({ theme }) => theme.orange};
      color: ${({ theme }) => theme.offWhite};
      :enabled:hover {
        background: ${({ theme }) => theme.orange};
      }
    }
    &--hasActive {
      background: ${({ theme }) => theme.orange};
      color: ${({ theme }) => theme.offWhite};
      :enabled:hover {
        background: ${({ theme }) => theme.orange};
      }
    }
  }
  .react-calendar__month-view__days__day {
    /* color: ${({ theme }) => theme.dark}; */
    &--weekend {
      color: ${({ theme }) => theme.orange};
      &.react-calendar__tile--active {
        color: ${({ theme }) => theme.offWhite};
      }
    }
    &--neighboringMonth {
      color: ${({ theme }) => rgba(theme.dark, 0.5)};
    }
  }

  .react-calendar__navigation {
    /* background: ${({ theme }) => theme.orange}; */
    button {
      background: ${({ theme }) => theme.orange};
      transition: .25s;
      :enabled:hover {
        background: ${({ theme }) => rgba(theme.orange, 0.9)};
      }
    }
    &__label {
      font-family: ${({ theme }) => theme.fontFamily};
      font-weight: ${({ theme }) => theme.boldWeight};
      text-transform: uppercase;
      color: ${({ theme }) => theme.offWhite};
      /* color: ${({ theme }) => theme.dark}; */
    }
    &__arrow {
      color: ${({ theme }) => theme.offWhite};
    }
  }
  
  
  .react-calendar__month-view__weekdays__weekday {
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: ${({ theme }) => theme.boldWeight};
    text-transform: uppercase;
  }
`;

export default DateField;
