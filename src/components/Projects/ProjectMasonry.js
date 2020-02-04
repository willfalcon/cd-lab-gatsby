import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Project from './Project';

import useSiteContext from '../SiteContext';

const ProjectMasonry = ({ projects }) => {
  // console.log(projects);

  const masonryOptions = {
    transitionDuration: 100,
  };

  const [hoverState, setHoverState] = useState(projects[0].images[0]._key);

  const containerRef = useRef(null);

  const { viewport } = useSiteContext();

  return (
    <StyledProjectMasonry
      className="masonry"
      onMouseLeave={() => setHoverState(null)}
      ref={containerRef}
    >
      <Masonry options={masonryOptions}>
        {projects.map(project => {
          return project.images.map((image, index) => {
            return (
              <Project
                {...project}
                image={image}
                key={image._key}
                hoverState={hoverState}
                setHoverState={setHoverState}
                index={index}
              />
            );
          });
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
    </StyledProjectMasonry>
  );
};

const StyledProjectMasonry = styled.div`
  flex: 0 0 60%;
  overflow: scroll;
  /* position: relative; */
`;

const DownArrow = styled.button`
  display: block;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  position: fixed;
  right: ${({ viewport }) => (viewport.width * 0.6) / 2 - 55}px;
  /* transform: translateX(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  background: ${({ theme }) => theme.orange};
  width: 50px;
  height: 50px;
  /* padding: 1rem; */
`;

export default ProjectMasonry;
