import React, { useRef, useEffect, useState } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { animated, useSpring, useTransition } from 'react-spring';

import ExpandButton from '../ExpandButton';
import Heading from '../Heading';
import Content from '../Content';
import CloseButton from '../CloseButton';

import useSiteContext from '../SiteContext';
import { media } from '../theme';

const Person = ({
  id,
  _rawBio,
  name,
  primary = false,
  position,
  image,
  expanded,
  index,
  accumulatedIndex,
  className,
  handleExpand,
}) => {
  const { viewport } = useSiteContext();

  const personRef = useRef(null);

  console.log(personRef);

  const size = viewport.width / 2;

  // const [top, setTop] = useState(0);
  // const [left, setLeft] = useState(0);

  const { current: ref } = personRef;

  const top =
    accumulatedIndex % 2 === 0
      ? (accumulatedIndex / 2) * size
      : ((accumulatedIndex - 1) / 2) * size;
  const left = accumulatedIndex % 2 === 0 ? 0 : size;

  const expandButtonTransition = useTransition(expanded, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const imageSpring = useSpring(
    expanded
      ? {
          transform: `translateX(${viewport.width / 2 -
            size / 2}) translateY(10px)`,
          left: `${viewport.width / 2 - (viewport.width * 0.75) / 2}px`,
          top: `${top + 20}px`,
          width: `${viewport.width * 0.75}px`,
          height: `${viewport.width * 0.75}px`,
        }
      : {
          transform: 'translateX(0) translateY(0)',
          left: `${left}px`,
          top: `${top}px`,
          width: `${size}px`,
          height: `${size}px`,
        }
  );

  const bioTransition = useTransition(expanded, null, {
    from: {
      width: `${size}px`,
      maxHeight: `0px`,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 2,
      opacity: 0,
    },
    enter: {
      width: `${viewport.width}px`,
      maxHeight: `1000px`,
      left: `0px`,
      top: `${top}px`,
      zIndex: 2,
      opacity: 1,
    },
    leave: {
      width: `${size}px`,
      maxHeight: `0px`,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1,
      opacity: 0,
    },
  });

  return (
    <>
      <StyledPerson
        className={`person ${
          primary ? `primary-${index + 1}` : `normal-${index + 1}`
        }`}
        expanded={expanded}
        ref={personRef}
        style={imageSpring}
        top={top}
        left={left}
        size={size}
      >
        <PersonImg fixed={image.asset.fixed} alt={name} viewport={viewport} />
        {expandButtonTransition.map(
          ({ item, key, props }) =>
            !item && (
              <AnimatedExpandButton
                key={key}
                style={props}
                handleClick={() => handleExpand(id)}
                cover
              />
            )
        )}
      </StyledPerson>
      {bioTransition.map(
        ({ item, key, props }) =>
          item && (
            <ExpandedPerson
              key={key}
              style={props}
              size={size}
              viewport={viewport}
            >
              <h4 className="position">{position}</h4>
              <Heading h2 className="name">
                {name}
              </Heading>
              <Content>{_rawBio}</Content>
              <CloseButton handleClick={() => handleExpand(null)} />
            </ExpandedPerson>
          )
      )}
    </>
  );
};

const AnimatedExpandButton = animated(ExpandButton);

const PersonImg = styled(Img)`
  /* z-index: 2; */
  width: 100% !important;
  height: 100% !important;
`;

const ExpandedPerson = styled(animated.div)`
  overflow: hidden;
  background: ${({ theme }) => theme.dark};
  z-index: 1;
  position: absolute;
  padding-top: ${({ viewport }) => viewport.width * 0.75 + 20}px;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  .block-content,
  * {
    color: ${({ theme }) => theme.offWhite};
    line-height: 2;
    ${media.break`
      color: ${({ theme }) => theme.dark};
    `}
  }
  .position {
    color: ${({ theme }) => theme.orange};
    line-height: 1.3;
    margin-bottom: 0.5rem;
    ${media.break`
      color: ${({ theme }) => theme.dark};
    `}
  }
  .name {
    font-size: 2.4rem;
    line-height: 1.3;
    color: ${({ theme }) => theme.offWhite};
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.boldWeight};
    font-family: ${({ theme }) => theme.fontFamily};
    letter-spacing: 3px;
    ${media.break`
      color: ${({ theme }) => theme.orange};
    `}

    ::after {
      content: '';
      display: block;
      width: 50px;
      height: 5px;
      background: ${({ theme }) => theme.orange};
      margin-top: 1rem;
    }
  }
`;

const StyledPerson = styled(animated.li)`
  /* flex: 0 0 50%;
  max-width: 50%; */
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  z-index: ${({ expanded }) => (expanded ? 3 : 0)};
  line-height: 1;
  display: block;
  /* background: ${({ expanded, theme }) =>
    expanded ? theme.dark : 'transparent'}; */
  /* transition: all 0.25s;
  padding: ${({ expanded }) => (expanded ? '1rem 1.5rem' : '0')}; */
  .person-image {
    width: 100%;
    height: 100%;
  }
  ${media.break`
    flex: ${({ primary }) => (primary ? '0 0 45%' : '0 0 33.333333%')};
    max-width: ${({ primary }) => (primary ? '45%' : '33.333333%')};
    position: ${({ expanded }) => (expanded ? 'absolute' : 'relative')};
    position: relative;
    padding: 0;
    background: ${({ theme }) => theme.offWhite};
    z-index: ${({ expanded }) => (expanded ? 5 : 1)};

    ${({ theme }) =>
      theme.grid &&
      `
      width: 100%;
      height: 100%;
      max-width: 100%;
      grid-row-end: span 3;
      grid-column-end: span 3;
      &.normal {
        &-1 {
          grid-area: person1;
        }
        &-2 {
          grid-area: person2;
        }
        &-3 {
          grid-area: person3;
        }
        &-4 {
          grid-area: person4;
        }
        &-5 {
          grid-area: person5;
        }
        &-6 {
          grid-area: person6;
        }
        &-7 {
          grid-area: person7;
        }
        &-8 {
          grid-area: person8;
        }
      }
    `}
  `}

  ${media.large`
    ${({ theme }) =>
      theme.grid &&
      `
      grid-row-end: span 2;
      grid-column-end: span 2;
    `}
  `}

  .gatsby-image-wrapper {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    display: block !important;
    /* width: 100% !important;
    height: 100% !important; */
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

  .expanded-person {
  }
`;

export default Person;
