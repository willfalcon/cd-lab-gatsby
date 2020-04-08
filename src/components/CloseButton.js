import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import classNames from 'classnames';

import { media } from './theme';

const CloseButton = ({
  handleClick,
  position,
  label = 'Close',
  className,
  styles,
  tiny = false,
}) => {
  const positions = {
    top: position && position.top ? position.top : 0,
    right: position && position.right ? position.right : 0,
  };

  return (
    <StyledCloseButton
      className={classNames('close-button', className)}
      onClick={handleClick}
      position={positions}
      id="close-button"
      aria-label={label}
      style={styles}
      tiny={tiny}
    >
      <span />
      <span />
    </StyledCloseButton>
  );
};

const StyledCloseButton = styled(animated.button)`
  background-color: ${({ theme, tiny }) =>
    tiny ? 'transparent' : theme.orange};
  outline: none;
  border: 0;
  width: 30px;
  /* width: ${({ tiny }) => (tiny ? '15px' : '30px')}; */
  height: 30px;
  /* height: ${({ tiny }) => (tiny ? '15px' : '30px')}; */
  cursor: pointer;
  ${media.break`
    /* width: 40px; */
    width: ${({ tiny }) => (tiny ? '20px' : '40px')};
    /* height: 40px; */
    height: ${({ tiny }) => (tiny ? '20px' : '40px')};
  `}
  position: absolute;
  top: ${({ position }) => position.top};
  right: ${({ position }) => position.right};
  z-index: 1;
  span {
    width: 16px;
    height: 2px;
    /* background: white; */
    background: ${({ theme, tiny }) => (tiny ? theme.dark : 'white')};
    display: border;
    position: absolute;
    top: 50%;
    left: 50%;
    ${media.break`
      height: 3px;
    `}
    &:nth-child(1) {
      transform: translateY(-50%) translateX(-50%) rotate(45deg);
    }
    &:nth-child(2) {
      transform: translateY(-50%) translateX(-50%) rotate(-45deg);
    }
  }
`;

export default CloseButton;
