import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Caret = ({ left = false, right = true, className }) => {
  if (left) {
    right = false;
  }
  return (
    <StyledCaret className={classNames('caret', className, { left, right })}>
      <span />
      <span />
    </StyledCaret>
  );
};

const StyledCaret = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: block;
  span {
    position: absolute;
    background: ${({ theme }) => theme.orange};
    height: 2px;
    width: 50%;
    top: 50%;
    left: 0;
    /* transform: translate(-50%, -50%); */
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
