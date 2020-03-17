import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import classNames from 'classnames';

import theme from './theme';

const Caret = ({ left = false, right = true, className, styles, color = theme.orange }) => {
  if (left) {
    right = false;
  }
  return (
    <StyledCaret className={classNames('caret', className, { left, right })} color={color} style={styles}>
      <span />
      <span />
    </StyledCaret>
  );
};

const StyledCaret = styled(animated.div)`
  position: relative;
  width: 20px;
  height: 20px;
  display: block;
  span {
    position: absolute;
    background: ${({ color }) => color};
    height: 2px;
    width: 50%;
    top: 50%;
    left: 0;
    transform-origin: left;
    border-radius: 1px;
    &:nth-child(1) {
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      transform: translateY(1px) rotate(-45deg);
    }
  }

  &.right {
    span {
      transform-origin: right;
      right: 0;
      left: initial;
      &:nth-child(1) {
        transform: translateY(1px) rotate(45deg);
      }
      &:nth-child(2) {
        transform: rotate(-45deg);
      }
    }
  }
`;

export default Caret;
