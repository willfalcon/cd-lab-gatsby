import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { ButtonBack, ButtonNext, CarouselContext } from 'pure-react-carousel';

import { media } from './theme';

const CarouselControls = ({
  prev,
  next,
  index,
  length,
  setIndex,
  className,
}) => {
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    function onChange() {
      setIndex(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <StyledControls className={classNames('carousel-controls', className)}>
      <ButtonBack
        className="controls__button previous"
        onClick={prev}
        aria-label="View Previous"
      >
        <span />
        <span />
      </ButtonBack>
      <span className="controls__numbers">
        {('0' + (index + 1)).slice(-2)} / {('0' + length).slice(-2)}
      </span>
      <ButtonNext
        className="controls__button next"
        onClick={next}
        aria-label="View Next"
      >
        <span />
        <span />
      </ButtonNext>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 1rem;
  .controls {
    &__numbers {
      color: ${({ theme }) => theme.offWhite};
      font-family: ${({ theme }) => theme.font.heading};
      letter-spacing: 1px;
      ${media.plus`
        letter-spacing: 1.5px;
      `}
      font-weight: ${({ theme }) => theme.font.bold};
      font-size: 1.4rem;
      padding: 0 7px;
    }

    &__button {
      position: relative;
      height: 30px;
      width: 25px;
      display: block;
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      &:focus {
        outline-color: ${({ theme }) => theme.offWhite};
      }
      span {
        position: absolute;
        width: 15px;
        height: 2px;
        display: block;
        background: ${({ theme }) => theme.offWhite};
        top: 50%;
        left: 50%;
        transform-origin: right;
        &:first-child {
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
        }
        &:last-child {
          transform: translateX(-50%) translateY(-50%) rotate(-45deg);
        }
      }
      &:first-child {
        transform: rotate(180deg);
      }
    }
  }
`;

export default CarouselControls;
