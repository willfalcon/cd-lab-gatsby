import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { ButtonStyles } from './Button';
import { media } from './theme';

const NewsletterButton = ({ children, className, plain = false }) => {
  return (
    <StyledNewsletterButton
      plain={plain}
      className={classNames('button', className)}
      dangerouslySetInnerHTML={{
        __html: `<button onclick="ml_account('webforms', '1988854', 'p0m6j3', 'show')">
          ${children}
        </button>`,
      }}
    />
  );
};

const StyledNewsletterButton = styled.span`
  cursor: pointer;
  ${media.break`
    margin-left: 1rem;
  `}
  button {
    cursor: pointer;
    ${({ plain, theme }) =>
      plain
        ? `
      color: ${theme.orange};
      text-transform: uppercase;
      font-weight: ${theme.font.black};
      letter-spacing: .38px;
      border: 0;
      font-size: 1.6rem;
    `
        : ButtonStyles}
    margin-bottom: 5rem;
  }
`;

export default NewsletterButton;
