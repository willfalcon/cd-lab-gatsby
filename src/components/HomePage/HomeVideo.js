import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTransition } from 'react-spring';

import PlayButton from '../PlayButton';
import VideoModal from './VideoModal';

import theme, { media } from '../theme';
import useSiteContext from '../SiteContext';

const HomeVideo = ({ thumbnail, homeVideoId, makeReady }) => {
  const [expanded, toggleExpanded] = useState(false);
  const videoRef = useRef(null);
  const { viewport } = useSiteContext();

  const placeholderRef = useRef(null);

  const [placeholderPos, setPlaceholderPos] = useState({
    width: 0, height: 0, top: 0, left: 0,
  });

  useEffect(() => {
    if (placeholderRef.current) {
      setPlaceholderPos({
        width: placeholderRef.current.offsetWidth,
        height: placeholderRef.current.offsetHeight,
        top: placeholderRef.current.offsetTop,
        left: placeholderRef.current.offsetLeft,
      })
    }
  }, [placeholderRef.current]);


  const alt = 'Creative Distillery Video Reel';

  const [dimensions, setDimensions] = useState({ width: 0, height: 1 });

  const videoWidth = videoRef.current ? videoRef.current.videoWidth : 0;
  const videoHeight = videoRef.current ? videoRef.current.videoHeight : 0;

  const aspect = dimensions.width / dimensions.height;

  const width = viewport.width < 768 ? viewport.width : 640;
  const height = viewport.width < 768 ? (viewport.width * 9) / 16 : 360;

  const mobile = viewport.width <= theme.sizes.break;

  const videoTransition = useTransition(expanded, null, mobile ? {
    from: {
      opacity: 0,
      width: `${placeholderPos.width}px`,
      height: `${placeholderPos.height}px`,
      top: `${placeholderPos.top}px`,
      left: `${placeholderPos.left}px`,
    },
    enter: {
      opacity: 1,
      width: `${placeholderPos.width}px`,
      height: `${placeholderPos.height}px`,
      top: `${placeholderPos.top}px`,
      left: `${placeholderPos.left}px`,
    },
    leave: { opacity: 0,
      width: `${placeholderPos.width}px`,
      height: `${placeholderPos.height}px`,
      top: `${placeholderPos.top}px`,
      left: `${placeholderPos.left}px`,
    }
  } : {
    from: {
      opacity: 0,
      width: `${placeholderPos.width}px`,
      height: `${placeholderPos.height}px`,
      top: `${placeholderPos.top}px`,
      left: `${placeholderPos.left}px`,
    },
    enter: {
      opacity: 1,
      width: `${width}px`,
      height: `${height}px`,
      top: `${(viewport.height / 2) - (height / 2)}px`,
      // top: `${0}px`,
      left: `${(viewport.width / 2) - (width / 2)}px`,
      // left: `${0}px`,
    },
    leave: {
      opacity: 0,
      width: `${placeholderPos.width}px`,
      height: `${placeholderPos.height}px`,
      top: `${placeholderPos.top}px`,
      left: `${placeholderPos.left}px`,
    }
  });

  useEffect(() => {
    if (videoWidth > 0) {
      setDimensions({
        width: videoWidth,
        height: videoHeight,
      });
    }
  }, [videoHeight, videoWidth]);

  return (
    <>
      <StyledVideoContainer
        className="home-video-container"
        expanded={expanded ? 'true' : undefined}
        viewport={viewport}
        ref={placeholderRef}
      >
        <img
          src={thumbnail}
          // onClick={handlePlay}
          expanded={expanded}
          alt={alt}
          className="home-video-thumbnail"
        />
        {!expanded && (
          <PlayButton handleClick={() => toggleExpanded(true)} opacity={0.75} />
        )}
      </StyledVideoContainer>
      {videoTransition.map(({item, key, props}) => item && (
        <VideoModal
          key={key}
          styles={props}
          handleClose={() => toggleExpanded(false)}
          expanded={expanded}
          videoRef={videoRef}
          videoId={homeVideoId}
          thumbnail={thumbnail}
          aspect={aspect}
          alt={alt}
          mobile={mobile}
        />
      ))}
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
