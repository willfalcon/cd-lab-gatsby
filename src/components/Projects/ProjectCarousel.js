import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Img from 'gatsby-image';

import CarouselControls from '../CarouselControls';

// TODO: Make projects openable in project carousel

const ProjectCarousel = ({ projects }) => {
  const [index, setIndex] = useState(0);

  const filteredProjects = projects.filter(project => project.images.length);
  const len = filteredProjects.length;
  const prevSlide = () => setIndex((index + len - 1) % len);
  const nextSlide = () => setIndex((index + 1) % len);
  return (
    <StyledProjectCarousel>
      <CarouselProvider
        className="projects-carousel"
        naturalSlideWidth={768}
        naturalSlideHeight={280}
        currentSlide={index}
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
                <StyledProjectCell className="projects-carousel__project carousel-project">
                  <Img
                    className="carousel-project__image"
                    fluid={project.images[0].asset.fluid}
                  />
                  <h2 className="carousel-project__title project-cell__link">
                    {project.title}
                  </h2>
                </StyledProjectCell>
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
    </StyledProjectCarousel>
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

const StyledProjectCell = styled.div`
  height: 100%;
  width: 100%;
  /* padding: 1rem; */
  position: absolute;
  background: white;
  .project-cell {
    &__image {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &__link {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 50px;
      background: ${({ theme }) => rgba(theme.orange, 0.75)};
      color: ${({ theme }) => theme.offWhite};
      text-decoration: none;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 60%;
      width: 55%;
      line-height: 1.15;
      font-size: 1.6rem;
    }
  }
`;

export default ProjectCarousel;
