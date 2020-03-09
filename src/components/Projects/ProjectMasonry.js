import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import Project from './Project';
import ProjectModal from './ProjectModal';
import DownArrow from './DownArrow';

import useSiteContext from '../SiteContext';
import getDimensions from './getDimensions';
import useModalTransition from './modalTransition';

const ProjectMasonry = ({ projects, project, slug, service = false, workpage = false }) => {

  const masonryOptions = {
    transitionDuration: 100,
  };

  const [hoverState, setHoverState] = useState(projects[0].images[0]._key);

  const containerRef = useRef(null);

  const { viewport } = useSiteContext();

  const initialProject = projects[projects.findIndex(proj => proj.slug.current === project)];
  // console.log({initialProject})

  const [expandedProject, setExpandedProject] = useState(null);

  // console.log(expandedProject);

  const [exitSizes, setExitSizes] = useState({
    exitWidth: 0,
    exitHeight: 0,
    exitTop: 0,
    exitLeft: 0,
  });

  const dimensions = expandedProject
    ? getDimensions(expandedProject.image.asset.fluid.aspectRatio, viewport)
    : { width: 0, height: 0 };

  useEffect(() => {
    if (expandedProject) {
      setExitSizes({
        exitWidth: expandedProject.location.width,
        exitHeight: expandedProject.location.height,
        exitTop: expandedProject.location.top,
        exitLeft: expandedProject.location.left,
      })
    }
  }, [expandedProject]);

  const serviceOrCollection = service ? 'service' : 'collection';

  const modalTransition = useModalTransition(expandedProject, dimensions, exitSizes, viewport, setHoverState);

  const handleCloseProject = () => {
    setExpandedProject(null);
    window.history.pushState({}, '', `/${serviceOrCollection}/${slug}`);
  }

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
              workpage
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
                  initialProject={initialProject}
                  serviceOrCollection={serviceOrCollection}
                  slug={slug}
                  expandedProject={expandedProject}
                />
              );
            })
          );
        })}
      </Masonry>
      <DownArrow containerRef={containerRef} viewport={viewport} />
      {modalTransition.map(
        ({ item, key, props }) => {
          return item && <ProjectModal 
            key={key} 
            viewport={viewport} 
            item={item} 
            styles={props} 
            handleCloseProject={handleCloseProject} 
            dimensions={dimensions} 
            initialProject={initialProject} 
          />
        }
      )}
    </StyledProjectMasonry>
  );
};

const StyledProjectMasonry = styled.div`
  flex: 0 0 60%;
  overflow: scroll;
`;

export default ProjectMasonry;
