import React from 'react';
import styled from 'styled-components';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const MenuToggle = () => {
  const { menuOpen, toggleMenu } = useSiteContext();
  return (
    <StyledToggle open={menuOpen} className="menu-toggle">
      <button onClick={() => toggleMenu()} aria-label="Toggle Menu">
        <span />
        <span />
        <span />
      </button>
    </StyledToggle>
  );
};

const StyledToggle = styled.div`
  width: 65px;
  height: 65px;
  flex-shrink: 0;
  z-index: 6;
  ${media.break`
    width: 75px;
    height: 75px;
    position: fixed;
    top: 100px;
    left: 0;
  `}
  background-color: ${({ theme }) => theme.dark};
  button {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    background: transparent;
    border: 0;
    outline: none;
    padding: 0;
    cursor: pointer;
    &:focus {
      outline: white auto 5px;
      outline-offset: -2px;
    }
  }
  span {
    width: 50%;
    height: 3px;
    display: block;
    position: absolute;
    left: 25%;
    ${media.break`
      width: 37.5px;
      height: 4px;
      left: 18.75px;
    `}
    background-color: white;
    transition: 0.25s;
    opacity: 1;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      top: ${({ open }) => (open ? '31px' : '18px')};
      ${media.break`
        top: ${({ open }) => (open ? '36px' : '21px')};
      `}
    }
    &:nth-child(2) {
      top: 31px;
      opacity: ${({ open }) => (open ? '0' : 'inherit')};
      ${media.break`
        top: 36px;
      `}
    }
    &:nth-child(3) {
      top: ${({ open }) => (open ? '31px' : '44px')};
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      ${media.break`
        top: ${({ open }) => (open ? '36px' : '51px')};
      `}
    }
  }
`;

export default MenuToggle;
