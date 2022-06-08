import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import FormPage from '../components/Forms/FormPage';

const Forms = ({ data: { sanityForm }, location }) => {
  return (
    <Wrapper location={location}>
      <FormPage {...sanityForm} />
    </Wrapper>
  );
};

export const formQuery = graphql`
  query formQuery {
    sanityForm(title: { eq: "Sample Form" }) {
      id
      _rawDescription(resolveReferences: { maxDepth: 10 })
      successMessage
      title
      formBuilder {
        ... on SanityCheckBoxes {
          _key
          _type
          fieldOptions {
            halfWidth
            required
            adminLabel
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
            adminLabel
          }
          name
        }
        ... on SanityRadioButtons {
          _key
          _type
          fieldOptions {
            halfWidth
            required
            adminLabel
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
            adminLabel
          }
          name
        }
        ... on SanityTextField {
          _key
          _type
          fieldOptions {
            halfWidth
            required
            adminLabel
          }
          name
        }
        ... on SanityPhoneField {
          _key
          _type
          fieldOptions {
            halfWidth
            required
            adminLabel
          }
          name
        }
        ... on SanityAddressField {
          _key
          _type
          fieldOptions {
            halfWidth
            required
            adminLabel
          }
          name
        }
        ... on SanityFileUpload {
          _key
          _type
          fieldOptions {
            halfWidth
            adminLabel
            required
          }
          name
        }
        ... on SanityDateField {
          _key
          _type
          fieldOptions {
            adminLabel
            halfWidth
            required
          }
          name
        }
        ... on SanityTimeField {
          _key
          _type
          fieldOptions {
            adminLabel
            halfWidth
            required
          }
          name
        }
        ... on SanityDateTimeField {
          _key
          _type
          fieldOptions {
            adminLabel
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
