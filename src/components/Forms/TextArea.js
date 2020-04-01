import React, { useState } from 'react';
import camelCase from 'camelcase';
import classNames from 'classnames';

// import { StyledLabel } from './QuoteForm';
import ErrorMessage from './ErrorMessage';

const TextArea = ({ name, register, fieldOptions, error }) => {

  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;

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
      <label
        className={classNames('field-text field-textarea', { focused })}
        htmlFor={camelCase(name)}
        halfWidth={halfWidth}
      >
        <span className="label-text">
          {name}
          {required && "*"}
        </span>
        <textarea
          className="text-area"
          name={camelCase(name)}
          ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default TextArea;
