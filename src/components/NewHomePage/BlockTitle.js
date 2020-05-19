import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const BlockTitle = ({ children, className, white = false }) => {
  return (
    <H2 className={classNames('block-title', className)} white={white}>
      {children}
    </H2>
  );
};

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.font.heading};
  font-weight: ${({ theme }) => theme.font.black};
  color: ${({ theme, white }) => (white ? theme.light : theme.black)};
  letter-spacing: 1.25px;
  font-size: 6rem;
  text-align: center;
`;

export default BlockTitle;
