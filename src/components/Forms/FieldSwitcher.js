import React from 'react';

import TextField from './TextField';
import TextArea from './TextArea';
import CheckBoxes from './CheckBoxes';
import RadioButtons from './RadioButtons';
import PhoneField from './PhoneField';
import AddressField from './AddressField';
import FileUpload from './FileUpload';
import DateField from './DateField';
import TimeField from './TimeField';
import DateTimeField from './DateTimeField';

const FieldSwitcher = ({ register, errors, control, field }) => {
  switch (field._type) {
    case 'textField':
    case 'emailField':
      return (
        <TextField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'phoneField':
      return (
        <PhoneField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'textArea':
      return (
        <TextArea
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'checkBoxes':
      return (
        <CheckBoxes
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'radioButtons':
      return (
        <RadioButtons
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'addressField':
      return (
        <AddressField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'fileUpload':
      return (
        <FileUpload
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
        />
      );
    case 'dateField':
      return (
        <DateField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
          control={control}
        />
      );
    case 'timeField':
      return (
        <TimeField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
          control={control}
        />
      );
    case 'dateTimeField':
      return (
        <DateTimeField
          {...field}
          key={field._key}
          register={register}
          error={errors[field.name]}
          control={control}
        />
      );
    default:
      return null;
  }
};

export default FieldSwitcher;
