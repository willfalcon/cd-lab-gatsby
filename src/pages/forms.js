import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import FormPage from '../components/Forms/FormPage';

const Forms = ({ data: { sanityForm } }) => {
  return (
    <Wrapper>
      <FormPage {...sanityForm} />
    </Wrapper>
  );
};

export const formQuery = graphql`
  query formQuery {
    sanityForm(title: {eq: "Sample Form"}) {
      id
      _rawDescription
      successMessage
      title
      formBuilder {
        ... on SanityCheckBoxes {
          _key
          _type
          fieldOptions {
            halfWidth
            required
          }
          name
          options
        }
        ... on SanityEmailField {
          _key
          _type
          fieldOptions {
            halfWidth
            required
          }
          name
        }
        ... on SanityRadioButtons {
          _key
          _type
          fieldOptions {
            halfWidth
            required
          }
          name
          options
        }
        ... on SanityTextArea {
          _key
          _type
          fieldOptions {
            halfWidth
            required
          }
          name
        }
        ... on SanityTextField {
          _key
          _type
          fieldOptions {
            halfWidth
            required
          }
          name
        }
      }
    }
  }
`;

export default Forms;