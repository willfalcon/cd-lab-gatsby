import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image/withIEPolyfill';

import ExpandButton from './ExpandButton';

import theme, { media } from './theme';
import useSiteContext from './SiteContext';

const Topic = ({ id, title, _rawContent, image, setExpandedTopic }) => {
  const { viewport } = useSiteContext();

  return (
    <StyledTopic className="topic" viewport={viewport}>
      <TopicImage
        className="topic__image"
        fixed={image.asset.fixed}
        alt={image.alt}
        objectFit="cover"
        width={viewport.width * 0.33333}
        height={viewport.width * 0.33333}
      />
      <h3 className="label">{title}</h3>
      <ExpandButton handleClick={() => setExpandedTopic(id)} />
    </StyledTopic>
  );
};

const StyledTopic = styled.div`
  display: inline-block;
  width: 33.333vw;
  height: 33.333vw;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.orange};
  .label {
    color: ${({ theme }) => theme.offWhite};
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ${media.medium`
      font-size: 1.3rem;
    `}
  }
`;

const TopicImage = styled(Img)`
  mix-blend-mode: multiply;
  opacity: 0.45;
  /* position: absolute; */
  /* width: 100%;
  height: 100%;
  top: 0;
  left: 0; */
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
`;

export default Topic;
