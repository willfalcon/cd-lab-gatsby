import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated, interpolate } from 'react-spring';
import Img from 'gatsby-image';

import Project, { StyledTitle } from './Project';
import BackgroundOverlay from '../BackgroundOverlay';
import CloseButton from '../CloseButton';
import ProjectContent from './ProjectContent';

import useSiteContext from '../SiteContext';
import getDimensions from './getDimensions';

const ProjectMasonry = ({ projects, workpage = false }) => {
  // console.log(projects);

  const masonryOptions = {
    transitionDuration: 100,
  };

  const [hoverState, setHoverState] = useState(projects[0].images[0]._key);

  const containerRef = useRef(null);

  const { viewport } = useSiteContext();

  const [expandedProject, setExpandedProject] = useState(null);

  // console.log(expandedProject);

  const [exitWidth, setExitWidth] = useState(0);
  const [exitHeight, setExitHeight] = useState(0);
  const [exitTop, setExitTop] = useState(0);
  const [exitLeft, setExitLeft] = useState(0);
  const dimensions = expandedProject
    ? getDimensions(expandedProject.image.asset.fluid.aspectRatio, viewport)
    : { width: 0, height: 0 };
  useEffect(() => {
    if (expandedProject) {
      setExitWidth(expandedProject.location.width);
      setExitHeight(expandedProject.location.height);
      setExitTop(expandedProject.location.top);
      setExitLeft(expandedProject.location.left);
    }
  }, [expandedProject]);

  const modalTransition = useTransition(expandedProject, null, {
    from: {
      opacity: 0,
      width: `${expandedProject ? expandedProject.location.width : 0}px`,
      height: `${expandedProject ? expandedProject.location.height : 0}px`,
      top: `${expandedProject ? expandedProject.location.top : 0}px`,
      left: `${expandedProject ? expandedProject.location.left : 0}px`,
      title: 1,
    },
    enter: {
      opacity: 1,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      top: `${
        expandedProject ? viewport.height / 2 - dimensions.height / 2 : 0
      }px`,
      left: `${
        expandedProject ? viewport.width / 2 - dimensions.width / 2 : 0
      }px`,
      title: 1,
    },
    leave: {
      opacity: 0,
      width: `${exitWidth}px`,
      height: `${exitHeight}px`,
      top: `${exitTop}px`,
      left: `${exitLeft}px`,
      title: 0,
    },
    onRest: () => setHoverState(null),
  });

  return (
    <StyledProjectMasonry
      className="masonry"
      onMouseLeave={() => setHoverState(null)}
      ref={containerRef}
    >
      <Masonry options={masonryOptions}>
        {projects.map((project, index) => {
          return workpage ? (
            <Project
              project={project}
              key={project.id}
              id={project.id}
              image={project.images[0]}
              hoverState={hoverState}
              setHoverState={setHoverState}
              index={index}
              slug={project.slug}
            />
          ) : (
            project.images.map((image, index) => {
              return (
                <Project
                  project={project}
                  key={image._key}
                  id={image._key}
                  image={image}
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  index={index}
                  setExpandedProject={setExpandedProject}
                />
              );
            })
          );
        })}
      </Masonry>
      <DownArrow
        viewport={viewport}
        onClick={e => {
          e.persist();
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
          });
          setTimeout(() => {
            let el = e.target;
            while (el.tagName !== 'BUTTON') {
              el = el.parentElement;
            }
            el.blur();
          }, 2000);
        }}
        aria-label="Scroll to the bottom"
      >
        <FontAwesomeIcon
          icon={faArrowDown}
          color={'white'}
          size="2x"
          className="down-arrow"
        />
      </DownArrow>
      {modalTransition.map(
        ({ item, key, props }) =>
          item && (
            <React.Fragment key={key}>
              <BackgroundOverlay
                style={{ opacity: props.opacity }}
                onClick={() => setExpandedProject(null)}
              />
              <ExpandedProject
                style={{
                  ...props,
                  opacity: 1,
                }}
                viewport={viewport}
              >
                <Img fluid={item.image.asset.fluid} />
                <CloseButton
                  handleClick={() => setExpandedProject(null)}
                  styles={{ opacity: props.opacity }}
                />
                {item._rawDescription && (
                  <ProjectContent
                    content={item._rawDescription}
                    title={item.title}
                    transitionStyles={{ opacity: props.opacity }}
                  />
                )}
                <StyledTitle style={{ opacity: props.title }}>
                  {item.title}
                </StyledTitle>
              </ExpandedProject>
            </React.Fragment>
          )
      )}
    </StyledProjectMasonry>
  );
};

const ExpandedProject = styled(animated.div)`
  position: absolute;
  background: white;
  z-index: 5;
`;

const StyledProjectMasonry = styled.div`
  flex: 0 0 60%;
  overflow: scroll;
`;

const DownArrow = styled.button`
  display: block;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  position: fixed;
  right: ${({ viewport }) => (viewport.width * 0.6) / 2 - 55}px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  background: ${({ theme }) => theme.orange};
  width: 50px;
  height: 50px;
`;

export default ProjectMasonry;
