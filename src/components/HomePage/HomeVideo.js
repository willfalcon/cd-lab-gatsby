import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import PlayButton from '../PlayButton';
import VideoModal from './VideoModal';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const HomeVideo = ({ thumbnail, homeVideoId }) => {
  const [expanded, toggleExpanded] = useState(false);
  const videoRef = useRef(null);
  const { viewport } = useSiteContext();

  return (
    <>
      <StyledVideoContainer
        className="home-video-container"
        expanded={expanded ? 'true' : undefined}
        viewport={viewport}
      >
        <img
          src={thumbnail}
          // onClick={handlePlay}
          expanded={expanded}
          alt="Creative Distillery Video Reel"
          className="home-video-thumbnail"
        />
        {!expanded && (
          <PlayButton handleClick={() => toggleExpanded(true)} opacity={0.75} />
        )}
        {expanded && (
          <VideoModal
            handleClose={() => toggleExpanded(false)}
            expanded={expanded}
            videoRef={videoRef}
            videoId={homeVideoId}
          />
        )}
      </StyledVideoContainer>
    </>
  );
};

const StyledVideoContainer = styled.div`
  max-width: 100%;
  flex: 0 0 33.333%;
  max-height: 33.333%;
  overflow: hidden;
  position: relative;
  ${media.break`
    max-height: ${({ viewport }) => viewport.height / 3}px;
    height: ${({ viewport }) => viewport.height / 3}px;
  `}
  img {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: ${({ theme }) => theme.break - 1}) {
      display: ${({ expanded }) => (expanded ? 'none' : 'block')};
    }
  }
  #close-button {
    z-index: 30;
  }
`;

export default HomeVideo;
