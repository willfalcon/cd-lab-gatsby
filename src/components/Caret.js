import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import classNames from 'classnames';

import theme from './theme';

const Caret = ({
  left = false,
  right = true,
  className,
  styles,
  color = theme.orange,
  pulse = false,
  spin = false,
  big = false,
  hover = false,
}) => {
  if (left) {
    right = false;
  }

  const [caretBumped, bumpCaret] = useState(false);

  const caretSpring = useSpring({
    from: {
      transform: spin ? `rotate(2turn) translateX(0px)` : `rotate(0turn) translateX(0px)`,
    },
    to: {
      transform:
        pulse || hover
          ? caretBumped || hover
            ? `rotate(0turn) translateX(10px)`
            : `rotate(0turn) translateX(0px)`
          : 'rotate(0turn) translateX(0px)',
    },
    onRest: () => bumpCaret(false),
  });

  useEffect(() => {
    if (pulse) {
      const caretInterval = setInterval(() => {
        bumpCaret(true);
      }, 4000);
      return () => clearInterval(caretInterval);
    }
  }, [pulse]);

  return (
    <StyledCaret
      className={classNames('caret', className, { left, right })}
      color={color}
      style={{
        ...styles,
        ...caretSpring,
        //  marginRight: '10px'
      }}
      props={{ big }}
    >
      <span />
      <span />
    </StyledCaret>
  );
};

const StyledCaret = styled(animated.div)`
  position: relative;
  width: 20px;
  height: 20px;
  ${({ props: { big } }) =>
    big &&
    `
    width: 30px;
    height: 30px;
  `}
  display: block;
  margin-right: 10px;
  span {
    position: absolute;
    background: ${({ color }) => color};
    height: 2px;
    height: ${({ big }) => (big ? '3px' : '2px')};
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
