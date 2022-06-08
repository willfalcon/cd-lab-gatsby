import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import ErrorPage from '../components/ErrorPage';

const error = ({ data, location }) => {
  return (
    <Wrapper error location={location}>
      <ErrorPage {...data.sanityHomePage} />
    </Wrapper>
  );
};

export const ErrorQuery = graphql`
  query ErrorQuery {
    sanityHomePage(_id: { eq: "homePage" }) {
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`;

export default error;
