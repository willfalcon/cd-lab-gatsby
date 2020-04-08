import React, { useState } from 'react';
import styled from 'styled-components';
// import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const FileUpload = ({ name, register, fieldOptions, error, _type }) => {

  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;

  // Focus State
  const [focused, setFocus] = useState(false);
  const [fileName, setFileName] = useState(false);

  console.log({focused, fileName});
  const handleFocus = e => {
    setFocus(true);
  }
  const handleBlur = e => {
      setFocus(false);
  }

  const handleChange = e => {
    const filePath = e.target.value;
    const splitFile = filePath.split("\\");
    const file = splitFile[splitFile.length - 1];
    if (file) {
      setFocus(true);
      setFileName(file);
    }

  }
  return (
    <>
      <FileInputLabel 
        className="field-file"
        isFocused={focused}
        fileName={fileName}
        htmlFor={adminLabel ? adminLabel : name}
        halfWidth={halfWidth}
      >
        <span className="label-text label-text--file">
          {name}
          {required && '*'}
        </span>
        <FileInput 
          className="file-input"
          type="file"
          name={adminLabel ? adminLabel : name}
          ref={register({ required })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {fileName && <span className="file-name">{fileName}</span>}
      </FileInputLabel>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

const FileInputLabel = styled(Label)`
  /* border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px; */
  cursor: pointer;
  position: relative;
  height: 64px;
  .file-name {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: .5rem;
  }
  &.field-file {
    /* margin: ${({ isFocused }) => isFocused ? '0px 1px 5px 1px' : '1px 1px 6px'};  */
    border: ${({ isFocused, theme }) => `${isFocused ? '3px' : '2px'} solid ${theme.orange}`};
    border-right: ${({ isFocused, theme }) => `2px solid ${theme.orange}`};
    .label-text--file {
      transform: ${({ fileName }) => fileName ? 'translateY(-115%)' : 'translateY(-50%)'};
      font-size: ${({ fileName }) => fileName && '1.2rem'};
    }
  }
  ::after {
    content: 'Browse';
    height: 100%;
    position: absolute;
    right: 0;
    right: ${({ isFocused }) => isFocused ? '-1px' : '0'};
    top: 0;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.offWhite};
    padding: 0 1rem; 
    text-align: center;
    pointer-events: none;
  }
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`;

export default FileUpload;