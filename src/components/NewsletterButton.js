import React from 'react';
import styled from 'styled-components';

import { ButtonStyles } from './Button';
import { media } from './theme';

const NewsletterButton = ({ children }) => {
  return (
    <StyledNewsletterButton
      dangerouslySetInnerHTML={{
        __html: `<button onclick="ml_account('webforms', '1988854', 'p0m6j3', 'show')">
          ${children}
        </button>`,
      }}
    />
  );
};

const StyledNewsletterButton = styled.span`
  ${media.break`
    margin-left: 1rem;
  `}
  button {
    ${ButtonStyles}
    margin-bottom: 5rem;
  }
`;

export default NewsletterButton;
