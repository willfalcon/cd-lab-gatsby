import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { animated } from 'react-spring';

const BlockTitle = React.forwardRef(
  ({ children, className, white = false, styles }, ref) => {
    return (
      <H2
        className={classNames('block-title', className)}
        white={white}
        ref={ref}
        style={styles}
      >
        {children}
      </H2>
    );
  }
);

const H2 = styled(animated.h2)`
  font-family: ${({ theme }) => theme.font.heading};
  font-weight: ${({ theme }) => theme.font.black};
  color: ${({ theme, white }) => (white ? theme.light : theme.black)};
  letter-spacing: 1.25px;
  font-size: 6rem;
  text-align: center;
`;

export default BlockTitle;
