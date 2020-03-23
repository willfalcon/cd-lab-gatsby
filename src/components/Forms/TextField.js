import React from 'react';
import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const TextField = ({ name, register, fieldOptions, error, _type }) => {

  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;

  return (
    <label 
      className="field-text"
      htmlFor={camelCase(name)}
      halfWidth={halfWidth}
    >
      <span className="label-text">
        {name}
        {required && '*'}
      </span>
      <input 
        className="text-input"
        type={_type === 'emailField' ? 'email' : 'text'}
        name={camelCase(name)}
        ref={register({ required })}
      />
      {error && <ErrorMessage error={error} />}
    </label>
  );
};

export default TextField;