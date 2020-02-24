import React from 'react';

import HomeVideo from './HomeVideo';
import FeaturedProjects from './FeaturedProjects';
import AboutLink from './AboutLink';

const HomeAside = ({
  thumbnail,
  homeVideoId,
  featuredProjects,
  aboutUsImage,
}) => {
  return (
    <>
      <HomeVideo thumbnail={thumbnail} homeVideoId={homeVideoId} />
      <FeaturedProjects projects={featuredProjects} />
      <AboutLink image={aboutUsImage} />
    </>
  );
};

export default HomeAside;
