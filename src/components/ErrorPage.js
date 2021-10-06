import React from 'react';

import PageLayout from './PageLayout';
import Content from './Content';

import Button from './Button';
import ContactFormButton from './ContactFormButton';

const ErrorPage = ({ _rawBody }) => {
  return (
    <PageLayout className="error-page">
      <main className="error-page__wrap main">
        <h1 className="error-page__status">404 Page Not Found</h1>
        <Content>{_rawBody}</Content>
        <Button className="error-page__home-link" href="/">
          Go Home
        </Button>
        <ContactFormButton />
      </main>
    </PageLayout>
  );
};

export default ErrorPage;
