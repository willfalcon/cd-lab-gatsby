import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import theme from './theme';

const PlayButton = ({ handleClick, opacity = 1 }) => {
  return (
    <StyledPlayButton
      className="play-icon-button"
      onClick={handleClick}
      opacity={opacity}
    >
      <FontAwesomeIcon icon={faPlay} color={theme.offWhite} size="4x" />
    </StyledPlayButton>
  );
};

const StyledPlayButton = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background: ${({ theme, opacity }) => rgba(theme.orange, opacity)};
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  cursor: pointer;
  display: flex;
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default PlayButton;
