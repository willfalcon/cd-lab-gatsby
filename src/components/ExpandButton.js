import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import classNames from 'classnames';

import { media } from './theme';

const ExpandButton = ({ handleClick, label = 'Expand', className, style }) => {
  return (
    <StyledExpandButton
      className={classNames('expand-button', className)}
      onClick={handleClick}
      aria-label={label}
      style={style}
    >
      <div>
        <span />
        <span />
      </div>
    </StyledExpandButton>
  );
};

const StyledExpandButton = styled.button`
  outline: none;
  border: 0;
  padding: 0;
  background: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
  div {
    width: 30px;
    height: 30px;
    background-color: ${({ theme }) => rgba(theme.offWhite, 0.25)};
    position: absolute;
    top: 0;
    left: 0;
    ${media.break`
      width: 40px;
      height: 40px;
    `}
  }

  span {
    width: 16px;
    height: 2px;
    background: white;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: 0.3s;
    ${media.break`
      height: 3px;
    `}
    &:nth-child(1) {
      transform: translateY(-50%) translateX(-50%);
    }
    &:nth-child(2) {
      transform: translateY(-50%) translateX(-50%) rotate(90deg);
    }
  }

  :hover {
    span {
      &:nth-child(1) {
        transform: translateY(-50%) translateX(-50%) rotate(180deg);
      }
      &:nth-child(2) {
        transform: translateY(-50%) translateX(-50%) rotate(-90deg);
      }
    }
  }
`;

export default ExpandButton;
