import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useSpring } from 'react-spring';

import PlayButton from '../../PlayButton';
import ProjectTitle from './ProjectTitle';

import theme from '../../theme';

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
  thumbnail,
  workpage = false,
}) => {
  const { id } = project;

  const ref = useRef(null);

  const [height, setHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);

  const aspect = thumbnail ? thumbnail.childImageSharp.fluid.aspectRatio : false;

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
      const title = ref.current.querySelector('h3');
      setTitleHeight(title.offsetHeight);
    }
  }, [hoverState]);

  const hovering = hoverState === id;

  const titleSpring = useSpring({
    height: hovering ? `${titleHeight + 10}px` : `${height}px`,
    background: hovering ? theme.orange : rgba('white', 0.65),
    titleOpacity: hovering ? 1 : 0,
  });

  useEffect(
    () => {
      if (initialProject && initialProject.id === id) {
        const location = ref.current.getBoundingClientRect();
        setExpandedProject({
          location,
          ...project,
          image,
          videoAspect: aspect,
          video,
          thumbnail,
        });
      }
    },
    // Adding aspect to dependency array creates a weird flash when video projects are opened.

    [
      id,
      image,
      initialProject,
      project,
      setExpandedProject,
      video,
      thumbnail,
      // aspect
    ]
  );

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
                videoAspect: aspect,
                thumbnail,
                scrollY: window.scrollY,
              });
              if (!expandedProject) {
                window.history.pushState({}, '', `/${serviceOrCollection}/${slug}/${project.slug.current}`);
              }
            }
      }
    >
      {thumbnail && (
        <>
          <ProjectImage fluid={thumbnail.childImageSharp.fluid} alt={project.title} />
          <PlayButton as="div" />
        </>
      )}
      {image && image.asset.extension === 'gif' && (
        <img src={image.asset.fluid.src} sizes={image.asset.fluid.sizes} srcSet={image.asset.fluid.srcSet} alt={project.title} />
      )}
      {image && image.asset.extension !== 'gif' && <ProjectImage fluid={image.asset.fluid} alt={project.title} />}
      <ProjectTitle className="project__title" styles={titleSpring} titleStyles={{ opacity: titleSpring.titleOpacity }} hovering={hovering}>
        {project.title}
      </ProjectTitle>
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

export default Project;
