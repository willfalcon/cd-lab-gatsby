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
    sanityForm {
      id
      title
      successMessage
      _rawDescription
      formBuilder {
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
        ... on SanityCheckBoxes {
          _key
          _type
          name
          options
          fieldOptions {
            halfWidth
            required
          }
        }
        ... on SanityEmailField {
          _key
          _type
          name
          fieldOptions {
            halfWidth
            required
          }
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
      }
    }
  }
`;

export default Forms;