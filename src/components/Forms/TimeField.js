import React, { useState } from 'react';
// import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const TimeField = ({ name, register, fieldOptions, error, _type }) => {
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

  return (
    <>
      <Label
        className="field-text field-time"
        isFocused={focused}
        htmlFor={adminLabel ? adminLabel : name}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <input
          className="text-input"
          type="text"
          name={adminLabel ? adminLabel : name}
          ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Label>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default TimeField;
