import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import useSiteContext from '../SiteContext';
import Content from '../Content';
import { media } from '../theme';

import { useOnScreen } from '../hooks';

const WhatWeDoTopic = ({
  id,
  active,
  titleRef,
  image,
  title,
  _rawShortContent,
  setActiveTopic,
}) => {
  const { viewport } = useSiteContext();
  const ref = useRef();
  const { isOnScreen } = useOnScreen(ref, '0px', { threshold: 1 });
  // console.log(title, isOnScreen);
  useEffect(() => {
    if (!active && isOnScreen) {
      setActiveTopic(id);
      console.log(title);
    }
  }, [isOnScreen]);

  return (
    <StyledTopic
      key={id}
      className="topic"
      viewport={viewport}
      title={titleRef}
      active={active}
      ref={ref}
    >
      <TopicSquare className="topic__square">
        <TopicImage
          className="topic__image"
          fixed={image.asset.fixed}
          alt={image.alt}
          objectFit="cover"
          width={viewport.width * 0.33333}
          height={viewport.width * 0.33333}
        />
        <h3 className="label">{title}</h3>
      </TopicSquare>
      <Content className="topic__content">{_rawShortContent}</Content>
    </StyledTopic>
  );
};

const TopicImage = styled(Img)`
  mix-blend-mode: multiply;
  opacity: 0.45;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
`;

const TopicSquare = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.orange};
  width: 175px;
  height: 175px;
  float: left;
  margin-right: 2rem;
  .label {
    color: ${({ theme }) => theme.offWhite};
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ${media.medium`
      /* font-size: 1.3rem; */
      font-size: 1.5rem;
    `}
  }
`;
const StyledTopic = styled.div`
  padding-bottom: 10vh;
  padding-top: 10vh;
  position: relative;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  &:first-child {
  }
  .topic {
    /* &__ */
  }
`;
export default WhatWeDoTopic;
