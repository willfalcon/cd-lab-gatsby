import React from 'react';
import styled, { css } from 'styled-components';

import { media } from './theme';

const Heading = ({
  heading,
  children,
  h2 = false,
  color = 'orange',
  inheritColor = false
}) => {
  return h2 ? (
    <StyledH2
      className="heading heading--h2"
      color={color}
      inheritColor={inheritColor}
    >
      {heading}
      {children}
    </StyledH2>
  ) : (
    <StyledHeading
      className="heading heading--h1"
      color={color}
      inheritColor={inheritColor}
    >
      {heading}
      {children}
    </StyledHeading>
  );
};

const headingStyles = css`
  color: ${({ theme, color }) => theme[color]};
  ${({ inheritColor }) =>
    inheritColor &&
    `
    color: inherit;
  `}
  font-weight: ${({ theme }) => theme.regularWeight};
  font-size: 3.6rem;
  margin: 0 0 0.5rem;
  &::after {
    display: block;
    content: '';
    width: 50px;
    background-color: ${({ theme, color }) => theme[color]};
    height: 1.5px;
    ${media.break`
      width: 75px;
    `}
  }
`;

const StyledHeading = styled.h1`
  ${headingStyles}
`;

const StyledH2 = styled.h2`
  ${headingStyles}
`;

export default Heading;