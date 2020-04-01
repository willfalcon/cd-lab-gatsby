import React from 'react';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
import Form from './Form';
import ContactFormButton from '../ContactFormButton';

const FormPage = ({ title, id, formBuilder, _rawDescription, successMessage }) => {

  console.log(formBuilder);
  return (
    <PageLayout>
      <div className="main">
        {/* <Heading>{title}</Heading> */}
        {/* <Content>{_rawDescription}</Content> */}
        <Form fields={formBuilder} title={title} _rawDescription={_rawDescription} successMessage={successMessage} />
        {/* <ContactFormButton>Let's Talk</ContactFormButton> */}
      </div>
    </PageLayout>
  );
};

export default FormPage;