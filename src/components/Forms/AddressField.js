import React, { useState } from 'react';
import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';
import TextField from './TextField';

const AddressField = ({ name, register, fieldOptions, error }) => {

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
      <div
        className="field-text field-address"
        // isFocused={focused}
        // htmlFor={camelCase(name)}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && "*"}
        </span>
        <TextField name={`Address Line 1`} register={register} />
        <TextField name={`Address Line 2`} register={register} />
        <TextField name={`City`} fieldOptions={{ halfWidth: true }} register={register} />
        <TextField name={`State`} fieldOptions={{ halfWidth: true }} register={register} />
        <TextField name={`Zip`} fieldOptions={{ halfWidth: true }} register={register} />
      </div>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default AddressField;
