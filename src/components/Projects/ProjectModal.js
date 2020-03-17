import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import ReactPlayer from 'react-player';

import BackgroundOverlay from '../BackgroundOverlay';
import ProjectTitle from './ProjectTitle';
import CloseButton from '../CloseButton';
import ProjectContent from './ProjectContent';


const ProjectModal = ({ viewport, item, styles, handleCloseProject, dimensions, initialProject }) => {
  const canonicalService = item ? item.categories[0] : null;
  const origin = window.location.origin;
  const canonicalUrl = canonicalService ? `${origin}/service/${canonicalService.slug.current}/${item.slug.current}` : false;

  const [contentOpen, toggleContent] = useState(false);

  useEffect(() => {
    if (initialProject && initialProject.id === item.id) {
      toggleContent(true);
    }
  }, [initialProject, item.id]);

  
  return (
    <React.Fragment>
      <BackgroundOverlay style={{ opacity: styles.opacity }}
        onClick={handleCloseProject}
      />
      <ExpandedProject
        style={{
          ...styles,
          opacity: 1,
        }}
        viewport={viewport}
        videoThumb={item.videoThumb}
      >
        {item.image && item.image.asset.extension === 'gif' && (
          <img src={item.image.asset.fluid.src} sizes={item.image.asset.fluid.sizes} srcSet={item.image.asset.fluid.srcSet} />
        )}
        {item.image && item.image.asset.extension !== 'gif' && <Img fluid={item.image.asset.fluid} />}
        {item.videoID && <ReactPlayer url={`https://vimeo.com/${item.videoID}`} controls width={dimensions.width} height={dimensions.height} />}
        <CloseButton
          handleClick={handleCloseProject}
          styles={{ opacity: styles.opacity }}
        />
        <ProjectTitle style={{ opacity: styles.title }} modal>
          {item.title}
        </ProjectTitle>
        {item._rawDescription && (
          <ProjectContent
            content={item._rawDescription}
            title={item.title}
            transitionStyles={{ opacity: styles.opacity }}
            contentOpen={contentOpen} 
            toggleContent={toggleContent}
            dimensions={dimensions}
          />
        )}
        {canonicalService && (
          <Helmet>
            <link rel="canonical" href={canonicalUrl} />
          </Helmet>
        )}
      </ExpandedProject>
    </React.Fragment>
  );
};

const ExpandedProject = styled(animated.div)`
  position: absolute;
  background: white;
  z-index: 8;
  ${({ videoThumb }) => videoThumb && `
    background-image: url(${videoThumb});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  `}
`;

export default ProjectModal;