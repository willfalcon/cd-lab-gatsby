import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const DownArrow = ({ containerRef, viewport }) => {
  return (
    <StyledDownArrow
      viewport={viewport}
      onClick={e => {
        e.persist();
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
        setTimeout(() => {
          let el = e.target;
          while (el.tagName !== 'BUTTON') {
            el = el.parentElement;
          }
          el.blur();
        }, 2000);
      }}
      aria-label="Scroll to the bottom"
    >
      <FontAwesomeIcon
        icon={faArrowDown}
        color={'white'}
        size="2x"
        className="down-arrow"
      />
    </StyledDownArrow>
  );
};

const StyledDownArrow = styled.button`
  display: block;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  position: fixed;
  right: ${({ viewport }) => (viewport.width * 0.6) / 2 - 55}px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  background: ${({ theme }) => theme.orange};
  width: 50px;
  height: 50px;
`;

export default DownArrow;