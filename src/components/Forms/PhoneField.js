import React, { useState } from 'react';
// import camelCase from 'camelcase';
import MaskedInput from "react-input-mask";

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const PhoneField = ({ name, register, fieldOptions, error, _type }) => {

  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;

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

  const isNotFilledTel = v => v && v.indexOf("_") === -1 ? undefined : "Please enter a valid 10 digit phone number.";

  return (
    <>
      <Label 
        className="field-text field-phone"
        isFocused={focused}
        htmlFor={name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <MaskedInput
          className="text-input"
          type="tel"
          name={name}
          inputRef={register({ 
            required, 
            validate: {
              inputTelRequired: isNotFilledTel
            }
          })}
          mask="(999) 999-9999"
          // alwaysShowMask
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Label>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default PhoneField;