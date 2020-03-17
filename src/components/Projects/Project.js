import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { useSpring, animated } from 'react-spring';

import PlayButton from '../PlayButton';

import { getThumb } from '../utils';
import theme from '../theme';

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

  const ref = useRef(null);
  
  const [videoThumb, setVideoThumb] = useState(null);
  const [videoAspect, setVideoAspect] = useState(null);
  const [height, setHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
      const title = ref.current.querySelector('h3');
      setTitleHeight(title.offsetHeight);
    }
  }, [ref.current]);

  const hovering = hoverState === id;

  const titleSpring = useSpring({
    height: hovering ? `${titleHeight + 10}px` : `${height}px`,
    background: hovering ? theme.orange : rgba('white', .65),
    color: hovering ? theme.offWhite : theme.dark,
  });

  console.log({height})

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
      <StyledTitle className="project__title"
       style={titleSpring}
       >
        <h3>{project.title}</h3>
      </StyledTitle>
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

const StyledTitle = styled(animated.div)`
  position: absolute;
  width: 100%;
  bottom: ${({ modal = false }) => modal ? '-30px' : 0};
  left: 0;
  background: ${({ theme }) => rgba(theme.orange, 0.75)};
  color: ${({ theme }) => theme.offWhite};
  margin-bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: center;
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
