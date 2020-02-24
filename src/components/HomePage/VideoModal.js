import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import ReactPlayer from 'react-player';

// import { roundToNearest } from '../../lib/utils';
import useSiteContext from '../SiteContext';
import CloseButton from '../CloseButton';
import { media } from '../theme';

const VideoModal = ({ handleClose, expanded, videoRef, videoId }) => {
  // const ref = useRef(null);
  const { viewport } = useSiteContext();
  // const width = roundToNearest(viewport.width * 0.8, 200);

  const [dimensions, setDimensions] = useState({ width: 0, height: 1 });

  const videoWidth = videoRef.current ? videoRef.current.videoWidth : 0;
  const videoHeight = videoRef.current ? videoRef.current.videoHeight : 0;
  // console.dir(ref.current);

  useEffect(() => {
    if (videoWidth > 0) {
      setDimensions({
        width: videoWidth,
        height: videoHeight,
      });
    }
  }, [videoHeight, videoWidth]);

  // const updateDimensions = e => {
  //   const { videoWidth, videoHeight } = e.target;
  //   setDimensions({
  //     width: videoWidth,
  //     height: videoHeight,
  //   });
  // };

  const aspect = dimensions.width / dimensions.height;
  // console.log(aspect);
  return (
    <>
      <VideoBackdrop onClick={handleClose} className="home-video-backdrop" />
      <StyledVideoModal
        className="video-modal"
        top={videoRef.current ? videoRef.current.offsetTop : 'inital'}
        viewwidth={viewport.width}
        viewHeight={viewport.height}
        aspect={aspect}
      >
        <ReactPlayer
          url={`https://vimeo.com/${videoId}`}
          controls
          width={viewport.width < 768 ? viewport.width : 640}
          height={viewport.width < 768 ? (viewport.width * 9) / 16 : 360}
          ref={videoRef}
        />
        <CloseButton handleClick={handleClose} />
      </StyledVideoModal>
    </>
  );
};

const VideoBackdrop = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 31;
  background: ${({ theme }) => rgba(theme.dark, 0.65)};
  ${media.break`
    display: block;
  `}
`;

const StyledVideoModal = styled.div`
  /* position: fixed; */
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
    
    /* width: 100%;
    height: 100%; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 35;
    padding-bottom: 0;
    width: auto;
    height: auto;
    /* ${({ viewwidth, aspect }) => `
      width: ${viewwidth * 0.75}px;
      height: ${(viewwidth * 0.75) / aspect}px;
    `} */
      video {
        position: static;
        /* width: 75%; */
        /* height: auto;
        object-fit: initial;
        position: absolute;
        top: 50%;
        left: 75px;
        transform: translateY(-50%); */
      }
  `}
`;

export default VideoModal;
