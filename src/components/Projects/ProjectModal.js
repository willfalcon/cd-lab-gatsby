import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import BackgroundOverlay from '../BackgroundOverlay';
import { StyledTitle } from './Project';
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
  }, []);

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
      >
        <Img fluid={item.image.asset.fluid} />
        <CloseButton
          handleClick={handleCloseProject}
          styles={{ opacity: styles.opacity }}
        />
        <StyledTitle style={{ opacity: styles.title }}>
          {item.title}
        </StyledTitle>
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
`;

export default ProjectModal;