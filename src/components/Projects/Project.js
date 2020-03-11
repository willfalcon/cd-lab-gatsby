import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { useTransition, animated } from 'react-spring';

import PlayButton from '../PlayButton';

import { getThumb } from '../utils';

const Project = ({
  project,
  hoverState,
  setHoverState,
  image,
  slug = false,
  setExpandedProject,
  initialProject,
  serviceOrCollection,
  expandedProject,
  video,
  workpage = false
}) => {

  const { id } = project;
  const overlayTransition = useTransition(hoverState === id, null, {
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

    
  const ref = useRef(null);
  
  const [videoThumb, setVideoThumb] = useState(null);
  const [videoAspect, setVideoAspect] = useState(null);

  useEffect(() => {
    async function getThumbnail() {
      const thumb = await getThumb(video);
      setVideoThumb(thumb);
      const tempImg = new Image();
      tempImg.src = thumb;
      setVideoAspect(tempImg.width/tempImg.height);
    }
    if (video) {
      getThumbnail();
    }
  }, [video]);


  useEffect(() => {
    if (initialProject && initialProject.id === id) {
      const location = ref.current.getBoundingClientRect();
      setExpandedProject({
        location,
        ...project,
        image,
        videoAspect: video ? videoAspect ? videoAspect : 16/9 : false,
        video,
        videoThumb
      });
    }
  }, [videoThumb]);

  return (
    <StyledProject
      onMouseEnter={() => setHoverState(id)}
      onMouseMove={() => setHoverState(id)} 
      as={workpage ? Link : 'button'}
      to={`/service/${slug.current}`}
      ref={ref}
      onClick={
        workpage
          ? null
          : () => {
              const location = ref.current.getBoundingClientRect();
              setExpandedProject({
                location,
                ...project,
                image,
                video,
                videoAspect: video ? videoAspect ? videoAspect : 16/9 : false,
                videoThumb
              });
              if(!expandedProject) {
                window.history.pushState({}, '', `/${serviceOrCollection}/${slug}/${project.slug.current}`);
              }
            }
      }
    >
      {videoThumb && (<>
        <img src={videoThumb} />
        <PlayButton as='div' />
      </>)}
      {image && image.asset.extension === 'gif' && (
        <img src={image.asset.fluid.src} sizes={image.asset.fluid.sizes} srcSet={image.asset.fluid.srcSet} />
      )}
      {image && image.asset.extension !== 'gif' && (<ProjectImage fluid={image.asset.fluid} />)}
      {overlayTransition.map(({ item, key, props }) =>
        item ? (
          <StyledTitle className="project__title" key={key} style={props}>
            {project.title}
          </StyledTitle>
        ) : (
          <Overlay key={key} style={props} />
        )
      )}
    </StyledProject>
  );
};

const StyledProject = styled.button`
  width: 50%;
  background: white;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
  position: relative;
  display: block;
`;

const ProjectImage = styled(Img)`
  width: 100% !important;
`;

const StyledTitle = styled(animated.h3)`
  position: absolute;
  width: 100%;
  bottom: 0;
  bottom: ${({ video }) => video ? '-30px' : 0};
  left: 0;
  background: ${({ theme }) => rgba(theme.orange, 0.75)};
  color: ${({ theme }) => theme.offWhite};
  margin-bottom: 0;
  text-align: center;
`;

const overlayStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${rgba('white', 0.65)};
`;

const Overlay = styled(animated.span)`
  ${overlayStyles}
`;

const OverlayLink = styled(Link)`
  ${overlayStyles}
`;

export { StyledTitle };
export default Project;
