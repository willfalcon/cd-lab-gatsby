import React, { useState } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import FeaturedProject from './FeaturedProject';
import CarouselControls from '../CarouselControls';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const FeaturedProjects = ({ projects, makeReady }) => {
  const { viewport } = useSiteContext();
  const [slideIndex, setIndex] = useState(0);
  const len = projects.length;
  const prevSlide = () => setIndex((slideIndex + len - 1) % len);
  const nextSlide = () => setIndex((slideIndex + 1) % len);

  return (
    <StyledFeaturedProjects className="featured-projects" viewport={viewport}>
      <CarouselProvider
        className="featured-projects__carousel"
        naturalSlideWidth={viewport.width * 0.4}
        naturalSlideHeight={viewport.height / 3}
        currentSlide={slideIndex}
        totalSlides={len}
      >
        <Slider className="featured-projects__slider">
          {projects.map(({ _key, project, service }, index) => {
            return (
              <Slide
                key={_key}
                index={index}
                className="featured-projects__slide"
              >
                <FeaturedProject
                  key={_key}
                  project={project}
                  service={service}
                />
              </Slide>
            );
          })}
        </Slider>
        <CarouselControls
          className="featured-projects__controls"
          prev={prevSlide}
          next={nextSlide}
          index={slideIndex}
          length={len}
          setIndex={setIndex}
        />
      </CarouselProvider>
    </StyledFeaturedProjects>
  );
};

const StyledFeaturedProjects = styled.div`
  position: relative;
  height: 75vw;
  height: ${({ viewport }) => viewport.width * 0.75}px;
  ${media.break`
    flex: 0 0 33.333%;
    max-height: 33.333%;
    height: ${({ viewport }) => viewport.height / 3}px;
    max-height: ${({ viewport }) => viewport.height / 3}px;
    .slider {
      max-height: 100%;
      .slider-list {
        max-height: 100%;
        height: 100%;
      }
      .slider-slide {
        max-height: 100%;
      }
    }
  `}

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
      width: 100%;
      height: 100%;
    }
  }
`;

export default FeaturedProjects;
