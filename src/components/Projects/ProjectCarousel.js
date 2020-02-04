import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Carousel from 'nuka-carousel';
import Img from 'gatsby-image';

import CarouselControls from '../CarouselControls';

const ProjectCarousel = ({ projects }) => {
  console.log(projects);

  const [index, setIndex] = useState(0);

  const filteredProjects = projects.filter(project => project.images.length);
  const len = filteredProjects.length;
  const prevSlide = () => setIndex((index + len - 1) % len);
  const nextSlide = () => setIndex((index + 1) % len);
  return (
    <StyledProjectCarousel>
      <Carousel
        withoutControls
        wrapAround
        slideIndex={index}
        afterSlide={index => setIndex(index)}
      >
        {filteredProjects.map(project => {
          return (
            <StyledProjectCell key={project.id}>
              <Img fluid={project.images[0].asset.fluid} />
              <h2 className="project-cell__link">{project.title}</h2>
            </StyledProjectCell>
          );
        })}
      </Carousel>
      <CarouselControls
        prev={prevSlide}
        next={nextSlide}
        index={index}
        length={len}
        className="controls"
      />
    </StyledProjectCarousel>
  );
};

const StyledProjectCarousel = styled.div`
  width: 100%;
  height: 80vw;
  position: relative;
  .gatsby-image-wrapper {
    height: 100% !important;
    width: 100% !important;
    > div {
      height: 100%;
    }
  }
  .slider-list {
    height: 100% !important;
  }
  .slider-slide {
    height: 100% !important;
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
