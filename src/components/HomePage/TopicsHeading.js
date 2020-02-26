import React from 'react';
import styled from 'styled-components';

import { media } from '../theme';

const TopicsHeading = ({ viewport, error }) => {
  return (
    <StyledTopicsHeading viewport={viewport} error={error}>
      What We Do
    </StyledTopicsHeading>
  );
};

const StyledTopicsHeading = styled.h2`
  width: ${({ theme }) => theme.topics.topicSize}px;
  display: none;
  position: absolute;
  right: ${({ viewport, error }) =>
    error ? viewport.width * 0.2 : viewport.width * 0.4}px;
  top: ${({ viewport, theme }) =>
    viewport.height / 2 -
    theme.topics.topicSize -
    theme.topics.topicSize / 2 -
    28}px;
  transform: translateY(-50%);
  text-align: center;
  /* font-size: 2.8rem; //default */
  ${media.break`
    display: block;
  `}
`;

export default TopicsHeading;
