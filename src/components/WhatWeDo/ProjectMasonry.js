import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import Project from '../Projects/ProjectMasonry/Project';
import ProjectModal from '../Projects/ProjectMasonry/ProjectModal';
import DownArrow from '../Projects/ProjectMasonry/DownArrow';

import useSiteContext from '../SiteContext';
import getDimensions from '../Projects/ProjectMasonry/getDimensions';
import useModalTransition from '../Projects/ProjectMasonry/modalTransition';

const ProjectMasonry = ({ projects, project, slug, service = false, workpage = false, whatWeDo = false }) => {
  // TODO: Feature: Carousel Controls to switch between images within the same project.
  // console.log(projects);
  const masonryOptions = {
    transitionDuration: 100,
  };

  const firstImage = workpage
    ? { _key: null }
    : projects[0]
    ? projects[0].images.length
      ? projects[0].images[0]._key
      : { _key: null }
    : { _key: null };

  const [hoverState, setHoverState] = useState(projects[0].id);

  const containerRef = useRef(null);

  const { viewport } = useSiteContext();

  const initialProject = projects[projects.findIndex(proj => proj.slug.current === project)];

  const [expandedProject, setExpandedProject] = useState(null);

  const [exitSizes, setExitSizes] = useState({
    exitWidth: 0,
    exitHeight: 0,
    exitTop: 0,
    exitLeft: 0,
  });

  const dimensions = expandedProject
    ? getDimensions(expandedProject.videoAspect ? expandedProject.videoAspect : expandedProject.image.asset.fluid.aspectRatio, viewport)
    : { width: 0, height: 0 };

  useEffect(() => {
    if (expandedProject) {
      const scrollY = expandedProject.scrollY || 0;
      setExitSizes({
        exitWidth: expandedProject.location.width,
        exitHeight: expandedProject.location.height,
        exitTop: expandedProject.location.top + scrollY,
        exitLeft: expandedProject.location.left,
      });
    }
  }, [expandedProject]);

  const serviceOrCollection = service ? 'service' : 'collection';
  const modalTransition = useModalTransition(expandedProject, dimensions, exitSizes, viewport, setHoverState);

  const handleCloseProject = () => {
    setExpandedProject(null);
    window.history.pushState({}, '', `/${serviceOrCollection}/${slug}`);
  };

  const container = useRef(null);
  return (
    <StyledProjectMasonry className="masonry" onMouseLeave={() => setHoverState(null)} ref={containerRef} whatWeDo={whatWeDo}>
      <Scroll ref={container} container={container}>
        <Masonry options={masonryOptions} className="what-we-do__masonry">
          {projects.map((project, index) => {
            if (workpage) {
              return (
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
              );
            }
            const { images, videoID } = project;

            if (videoID) {
              return (
                <Project
                  project={project}
                  key={project.id}
                  id={project.id}
                  video={videoID}
                  thumbnail={project.videoThumbnail}
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
            }
            if (images.length) {
              return images.map((image, index) => {
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
              });
            }
            return null;
          })}
        </Masonry>
        <DownArrow containerRef={containerRef} viewport={viewport} />
        {modalTransition((props, item) => {
          return (
            item && (
              <ProjectModal
                key={key}
                viewport={viewport}
                item={item}
                styles={props}
                handleCloseProject={handleCloseProject}
                dimensions={dimensions}
                initialProject={initialProject}
              />
            )
          );
        })}
      </Scroll>
    </StyledProjectMasonry>
  );
};

const StyledProjectMasonry = styled.div`
  flex: 0 0 60%;
  /* overflow: scroll; */

  overflow: hidden;
  position: relative;
  height: 100%;
`;

const Scroll = styled.div`
  overflow: scroll;
  position: absolute;
  height: 100%;

  right: -${({ container }) => container.current?.offsetWidth - container.current?.clientWidth}px;
  top: 0;
  left: 0;
  bottom: 0;
`;

export default ProjectMasonry;
