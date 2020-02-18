import React from 'react';
import styled from 'styled-components';

import HomeVideo from './HomeVideo';
import FeaturedProjects from './FeaturedProjects';
import AboutLink from './AboutLink';

import { media } from '../theme';

const HomeAside = ({
  thumbnail,
  homeVideoId,
  featuredProjects,
  aboutUsImage,
}) => {
  return (
    <StyledHomeAside>
      <HomeVideo thumbnail={thumbnail} homeVideoId={homeVideoId} />
      <FeaturedProjects projects={featuredProjects} />
      <AboutLink image={aboutUsImage} />
    </StyledHomeAside>
  );
};

const StyledHomeAside = styled.aside`
  ${media.break`
    flex: 0 0 40%;
    max-width: 40%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

export default HomeAside;
