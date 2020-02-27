import React, { useState, useLayoutEffect, useRef } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { animated } from 'react-spring';

import ExpandButton from '../ExpandButton';
import Heading from '../Heading';
import Content from '../Content';
import CloseButton from '../CloseButton';
import BackgroundOverlay from '../BackgroundOverlay';

import StyledPerson from './StyledPerson';
import {
  useExpandButtonTransition,
  useImageSpring,
  useBioTransition,
} from './springs';

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

  const size = viewport.width / 2;

  const top =
    accumulatedIndex % 2 === 0
      ? (accumulatedIndex / 2) * size
      : ((accumulatedIndex - 1) / 2) * size;
  const left = accumulatedIndex % 2 === 0 ? 0 : size;

  const [refPosition, setPosition] = useState(null);

  const ref = useRef(null);
  useLayoutEffect(() => {
    setPosition(ref.current.getBoundingClientRect());
  }, []);

  const expandButtonTransition = useExpandButtonTransition(expanded);

  const imageSpring = useImageSpring(
    expanded,
    viewport,
    top,
    left,
    size,
    refPosition
  );

  const bioTransition = useBioTransition(
    expanded,
    viewport,
    top,
    left,
    size,
    refPosition
  );

  return (
    <>
      {bioTransition.map(
        ({ item, key, props }) =>
          item && (
            <React.Fragment key={key}>
              <BackgroundOverlay
                onClick={() => handleExpand(null)}
                style={{
                  opacity: props.o.interpolate(o => o),
                  zIndex: 8,
                }}
              />
              <ExpandedPerson
                className="expanded-person"
                style={props}
                size={size}
                viewport={viewport}
              >
                <div className="person-info">
                  <h4 className="position">{position}</h4>
                  <Heading h2 className="name">
                    {name}
                  </Heading>
                  <Content>{_rawBio}</Content>
                </div>
                <CloseButton handleClick={() => handleExpand(null)} />
              </ExpandedPerson>
            </React.Fragment>
          )
      )}
      <StyledPerson
        className={`person ${
          primary ? `primary-${index + 1}` : `normal-${index + 1}`
        }`}
        expanded={expanded}
        style={imageSpring}
        top={top}
        left={left}
        size={size}
        ref={ref}
        pos={refPosition}
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
  ${media.break`
    padding-top: 2rem;
    background: ${({ theme }) => theme.offWhite};
    .block-content, * {
      color: ${({ theme }) => theme.dark};
    }
    .person-info {
      width: 55%;
    }
  `}
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

export default Person;
