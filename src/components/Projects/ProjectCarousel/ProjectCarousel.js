import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import { useTransition } from 'react-spring';

import 'pure-react-carousel/dist/react-carousel.es.css';

import CarouselControls from '../../CarouselControls';
import CarouselProject from './CarouselProject';
import MobileProjectModal from './MobileProjectModal';

const ProjectCarousel = ({ projects, project, service = false, slug }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const initialProjectIndex = project
    ? projects.findIndex(proj => proj.slug.current === project)
    : 0;
  const initialProject = project ? projects[initialProjectIndex] : false;
  const [index, setIndex] = useState(initialProjectIndex);

  const filteredProjects = projects.filter(project => project.images.length);
  const len = filteredProjects.length;
  const prevSlide = () => setIndex((index + len - 1) % len);
  const nextSlide = () => setIndex((index + 1) % len);

  const modalTransition = useTransition(modalOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const serviceOrCollection = service ? 'service' : 'collection';

  const handleCloseProject = () => {
    setModalOpen(null);
    window.history.pushState({}, '', `/${serviceOrCollection}/${slug}`);
  };

  return (
    <>
      <StyledProjectCarousel className="projects-carousel-wrapper">
        <CarouselProvider
          className="projects-carousel"
          naturalSlideWidth={768}
          naturalSlideHeight={280}
          currentSlide={initialProjectIndex}
          totalSlides={len}
        >
          <Slider className="projects-carousel__slider">
            {filteredProjects.map((project, i) => {
              return (
                <Slide
                  className="projects-carousel__slide"
                  key={project.id}
                  index={i}
                >
                  <CarouselProject
                    {...project}
                    setExpandedProject={setExpandedProject}
                    setModalOpen={setModalOpen}
                    initialProject={initialProject}
                    serviceOrCollection={serviceOrCollection}
                    mainSlug={slug}
                    expandedProject={expandedProject}
                  />
                </Slide>
              );
            })}
          </Slider>
          <CarouselControls
            prev={prevSlide}
            next={nextSlide}
            index={index}
            length={len}
            setIndex={setIndex}
            className="controls"
          />
        </CarouselProvider>
        {modalTransition.map(
          ({ item, key, props }) =>
            item && (
              <MobileProjectModal
                key={key}
                style={props}
                {...expandedProject}
                setExpandedProject={setExpandedProject}
                setModalOpen={setModalOpen}
                handleCloseProject={handleCloseProject}
              />
            )
        )}
      </StyledProjectCarousel>
    </>
  );
};

const StyledProjectCarousel = styled.div`
  width: 100%;
  height: 80vw;
  position: relative;
  .carousel {
    height: 100%;
    &__slider {
      height: 100%;
    }
    &__slider-tray-wrapper {
      height: 100%;
    }
    &__slider-tray {
      height: 100%;
    }
    &__slide {
      height: 100%;
    }
  }
  .gatsby-image-wrapper {
    height: 100% !important;
    width: 100% !important;
    > div {
      height: 100%;
    }
  }
  .controls {
    background: ${({ theme }) => rgba(theme.orange, 0.75)};
    max-width: 40%;
    width: 35%;
  }
`;

export default ProjectCarousel;
