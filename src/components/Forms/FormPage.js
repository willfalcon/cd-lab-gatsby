import React from 'react';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
import Form from './Form';

const FormPage = ({ title, id, formBuilder, _rawDescription, successMessage }) => {

  console.log(formBuilder);
  return (
    <PageLayout>
      <div className="main">
        <Heading>{title}</Heading>
        <Content>{_rawDescription}</Content>
      </div>
      <Form fields={formBuilder} successMessage={successMessage} />
    </PageLayout>
  );
};

export default FormPage;