import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image/withIEPolyfill';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import { animated } from 'react-spring';

import 'pure-react-carousel/dist/react-carousel.es.css';

import Heading from '../../Heading';
import Content from '../../Content';
import CloseButton from '../../CloseButton';
import CarouselControls from '../../CarouselControls';

import useSiteContext from '../../SiteContext';

const MobileProjectModal = ({
  images,
  title,
  _rawDescription,
  // setExpandedProject,
  // setModalOpen,
  style,
  // categories,
  // slug,
  handleCloseProject,
}) => {
  const { viewport } = useSiteContext();

  // const canonicalService = categories ? categories[0] : false;
  // const origin = window.location.origin;
  // const canonicalUrl = canonicalService
  //   ? `${origin}/service/${canonicalService.slug.current}/${slug.current}`
  //   : false;

  const [slideIndex, setIndex] = useState(0);
  const len = images.length;
  const prevSlide = () => setIndex((slideIndex + len - 1) % len);
  const nextSlide = () => setIndex((slideIndex + 1) % len);
  const sliderHeight = images.reduce((prev, current) => {
    const prevAspect = prev.asset ? prev.asset.fluid.aspectRatio : false;
    const aspect = current.asset.fluid.aspectRatio;
    // w / h = a
    // ah = w
    // h = w / a
    const prevHeight = prevAspect ? (viewport.width - 40) / prevAspect : 0;
    const height = (viewport.width - 40) / aspect;

    if (!prev) return height;
    return height > prevHeight ? height : prevHeight;
  });
  return (
    <StyledModal className="mobile-project-modal" style={style}>
      <Heading className="mobile-project-modal__title" h2>
        {title}
      </Heading>
      {images.length > 1 ? (
        <CarouselProvider
          className="project-modal-carousel"
          naturalSlideWidth={viewport.width - 40}
          naturalSlideHeight={sliderHeight}
          currentSlide={slideIndex}
          totalSlides={len}
        >
          <Slider className="project-modal-slider">
            {images.map((image, index) => {
              return (
                <Slide
                  className="project-modal-slider__slide"
                  index={index}
                  key={index}
                >
                  {image.asset.extension === 'gif' ? (
                    <img
                      className="carousel-project__image"
                      src={image.asset.fluid.src}
                      srcset={image.asset.fluid.srcSet}
                      sizes={image.asset.fluid.sizes}
                      alt={title}
                    />
                  ) : (
                    <Img
                      className="project-modal-slider__image"
                      fluid={image.asset.fluid}
                      alt={title}
                      objectFit="contain"
                      objectPosition="center"
                    />
                  )}
                </Slide>
              );
            })}
          </Slider>
          <CarouselControls
            className="project-modal-carousel__controls"
            prev={prevSlide}
            next={nextSlide}
            index={slideIndex}
            length={len}
            setIndex={setIndex}
          />
        </CarouselProvider>
      ) : images[0].asset.extension === 'gif' ? (
        <img
          className="carousel-project__image"
          src={images[0].asset.fluid.src}
          srcset={images[0].asset.fluid.srcSet}
          sizes={images[0].asset.fluid.sizes}
          alt={title}
        />
      ) : (
        <Img
          className="mobile-project-modal__image"
          fluid={images[0].asset.fluid}
          alt={title}
        />
      )}
      <Content className="mobile-project-modal__content">
        {_rawDescription}
      </Content>
      <CloseButton handleClick={handleCloseProject} />
    </StyledModal>
  );
};

const StyledModal = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.dark};
  padding: 2rem;
  padding-top: 5rem;
  .carousel.project-modal-carousel {
    /* height: 300px; */
    position: relative;
    padding-bottom: 50px;
    /* background: ${({ theme }) => theme.offWhite}; */
    li {
      width: 100%;
    }
    .carousel-controls {
      background: ${({ theme }) => theme.orange};
    }
  }
  .project-modal-slider {
    &__slider {
      height: 100%;
    }
    &__slide {
      background: white;
    }
  }
  .main & .mobile-project-modal {
    &__image {
      margin-bottom: 2rem;
      background: white;
    }
    &__title {
      padding: 0;
      font-size: 2.4rem;
      line-height: 1.3;
      color: ${({ theme }) => theme.offWhite};
      margin-bottom: 1rem;
      text-transform: uppercase;
      font-weight: ${({ theme }) => theme.font.bold};
      font-family: ${({ theme }) => theme.font.heading};
      letter-spacing: 3px;
      ::after {
        /* content: ''; */
        /* display: block; */
        /* width: 50px; */
        height: 5px;
        margin-top: 1rem;
      }
    }
    &__content {
      color: ${({ theme }) => theme.offWhite};
    }
  }
`;

export default MobileProjectModal;
