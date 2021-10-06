import React from 'react';

import PageLayout from '../PageLayout';
import Form from './Form';

const FormPage = ({ title, id, formBuilder, _rawDescription, successMessage }) => {
  return (
    <PageLayout>
      <div className="main">
        <Form fields={formBuilder} title={title} _rawDescription={_rawDescription} successMessage={successMessage} />
      </div>
    </PageLayout>
  );
};

export default FormPage;
