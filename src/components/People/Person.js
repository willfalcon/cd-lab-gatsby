import React, { useState, useLayoutEffect, useRef } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { animated } from 'react-spring';

import ExpandButton from '../ExpandButton';

import BackgroundOverlay from '../BackgroundOverlay';

import ExpandedPerson from './ExpandedPerson';
import StyledPerson from './StyledPerson';
import {
  useExpandButtonTransition,
  useImageSpring,
  useBioTransition,
} from './springs';

import useSiteContext from '../SiteContext';

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

  console.log(ref.current, refPosition);
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
                styles={props}
                size={size}
                name={name}
                position={position}
                _rawBio={_rawBio}
                handleExpand={handleExpand}
                viewport={viewport}
              />
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

export default Person;
