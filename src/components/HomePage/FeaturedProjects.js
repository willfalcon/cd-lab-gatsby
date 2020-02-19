import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import FeaturedProject from './FeaturedProject';
import CarouselControls from '../CarouselControls';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const FeaturedProjects = ({ projects }) => {
  const { viewport } = useSiteContext();
  const [index, setIndex] = useState(0);
  const len = projects.length;
  const prevSlide = () => setIndex((index + len - 1) % len);
  const nextSlide = () => setIndex((index + 1) % len);
  return (
    <StyledFeaturedProjects className="featured-projects" viewport={viewport}>
      <Carousel
        withoutControls
        wrapAround
        slideIndex={index}
        afterSlide={index => setIndex(index)}
      >
        {projects.map(({ _key, project, service }) => {
          return (
            <FeaturedProject key={_key} project={project} service={service} />
          );
        })}
      </Carousel>
      <CarouselControls
        prev={prevSlide}
        next={nextSlide}
        index={index}
        length={len}
      />
    </StyledFeaturedProjects>
  );
};

const StyledFeaturedProjects = styled.div`
  position: relative;
  height: 75vw;
  height: ${({ viewport }) => viewport.width * 0.75}px;
  ${media.break`
    flex: 0 0 33.333%;
    /* max-height: 33.333%; */
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
`;

export default FeaturedProjects;
