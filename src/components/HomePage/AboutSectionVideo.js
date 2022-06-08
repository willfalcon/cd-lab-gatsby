import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import ReactPlayer from 'react-player';

import PlayButton from '../PlayButton';
import { media } from '../theme';
import useSiteContext from '../SiteContext';

const AboutSectionVideo = ({ thumbnail, video, maxHeight }) => {
  const alt = 'Creative Distillery Video Reel';
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { viewport } = useSiteContext();
  const videoTransitions = useTransition(videoOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });
  const loadTransitions = useTransition(videoLoaded, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const videoHeight = viewport.width < 768 ? ((viewport.width - 20) * 9) / 16 : (900 * 9) / 16;

  const videoWidth = maxHeight < videoHeight ? (16 * maxHeight) / 9 : 900;
  return (
    <VideoContainer className="home-video" style={{ maxHeight: `${maxHeight}px`, maxWidth: `${videoWidth}px` }}>
      {loadTransitions(
        (props, item) =>
          !item && <animated.img className="home-video__thumbnail" style={{ maxHeight, ...props }} src={thumbnail} alt={alt} />
      )}
      {!videoOpen && <PlayButton handleClick={() => setVideoOpen(true)} />}
      {videoTransitions(
        (props, item) =>
          item && (
            <Video
              url={`https://vimeo.com/${video}`}
              controls
              className="home-video__video"
              // width={viewport.width < 768 ? viewport.width : 640}
              width={videoWidth}
              // height={viewport.width < 768 ? (viewport.width * 9) / 16 : 360}
              // height={(900 * 9) / 16}
              height={videoHeight}
              // ref={videoRef}
              volume={0.5}
              onReady={() => {
                setVideoLoaded(true);
                setPlaying(true);
              }}
              playing={playing}
              style={{ maxHeight, ...props }}
            />
          )
      )}
    </VideoContainer>
  );
};

const Video = animated(ReactPlayer);

const VideoContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 900px;
  height: calc((100vw - 20px) * 9 / 16);
  ${media.break`
    height: ${(900 * 9) / 16}px;
  `}
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  .home-video__thumbnail {
    width: 900px;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .home-video__video {
    width: 900px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default AboutSectionVideo;
