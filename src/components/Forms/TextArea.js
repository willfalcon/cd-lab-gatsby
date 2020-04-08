import React, { useState } from 'react';
// import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const TextArea = ({ name, register, fieldOptions, error }) => {

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

  return (
    <>
      <Label
        className="field-text field-textarea"
        isFocused={focused}
        htmlFor={name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && "*"}
        </span>
        <textarea
          className="text-area"
          name={name}
          ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Label>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default TextArea;
