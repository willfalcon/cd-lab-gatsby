import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { animated, useTransition } from 'react-spring';

// import { roundToNearest } from '../../lib/utils';
import useSiteContext from '../SiteContext';
import CloseButton from '../CloseButton';
import { media } from '../theme';
import BackgroundOverlay from '../BackgroundOverlay';

const VideoModal = ({
  handleClose,
  expanded,
  videoRef,
  videoId,
  thumbnail,
  alt,
  aspect,
  styles,
  mobile,
}) => {
  const { viewport } = useSiteContext();

  const [videoLoaded, setVideoLoaded] = useState(false);

  const thumbnailTransition = useTransition(videoLoaded, null, {
    from: {
      opacity: 1,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const [playing, setPlaying] = useState(false);

  return (
    <>
      <BackgroundOverlay
        onClick={handleClose}
        className="home-video-backdrop"
        style={{ opacity: styles.opacity }}
      />
      <StyledVideoModal
        className="video-modal"
        top={videoRef.current ? videoRef.current.offsetTop : 'inital'}
        viewwidth={viewport.width}
        viewHeight={viewport.height}
        aspect={aspect}
        style={styles}
      >
        {thumbnailTransition.map(
          ({ item, key, props }) =>
            !item &&
            !mobile && (
              <animated.img
                key={key}
                className="video-modal-thumbnail"
                src={thumbnail}
                alt={alt}
                style={{ ...props }}
              />
            )
        )}
        <ReactPlayer
          url={`https://vimeo.com/${videoId}`}
          controls
          width={viewport.width < 768 ? viewport.width : 640}
          height={viewport.width < 768 ? (viewport.width * 9) / 16 : 360}
          ref={videoRef}
          onReady={() => {
            setVideoLoaded(true);
            setPlaying(true);
          }}
          playing={playing}
        />
        <CloseButton handleClick={handleClose} />
      </StyledVideoModal>
    </>
  );
};

const StyledVideoModal = styled(animated.div)`
  position: absolute;
  top: ${({ top }) => top}px;
  top: 0;
  width: 100%;
  height: 56.25vw;
  padding-bottom: 56.25%;
  height: 0;
  z-index: 1;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  ${media.break`
    top: 50%;
    left: 50%;
    /* transform: translate(-50%, -50%); */
    z-index: 35;
    padding-bottom: 0;
    width: auto;
    height: auto;
      video {
        position: static;
      }
      .video-modal-thumbnail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &:focus {
          outline: none;
        }
      }
  `}
`;

// const VideoBackdrop = styled.div`
//   display: none;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 31;
//   background: ${({ theme }) => rgba(theme.dark, 0.65)};
//   ${media.break`
//     display: block;
//   `}
// `;

export default VideoModal;
