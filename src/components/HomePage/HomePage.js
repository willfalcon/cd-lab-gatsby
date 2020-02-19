import React, { useRef } from 'react';
import styled from 'styled-components';
import Loadable from '@loadable/component';

import Content from '../Content';
import HomeTopics from './HomeTopics';
import ContactFormButton from '../ContactForm/ContactFormButton';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const HomeVideo = Loadable(() => import('./HomeVideo'));
const FeaturedProjects = Loadable(() => import('./FeaturedProjects'));
const AboutLink = Loadable(() => import('./AboutLink'));

const HomePage = ({
  _rawBody,
  mainImage,
  homeVideoId,
  thumbnail,
  featuredProjects,
  aboutUsImage,
}) => {
  const mainRef = useRef(null);
  const { viewport } = useSiteContext();
  return (
    <StyledHomePage className="container homepage" viewport={viewport}>
      <HomeMain
        className="homepage-main"
        viewport={viewport}
        bg={mainImage.asset.url}
      >
        <Content>{_rawBody}</Content>
        <ContactFormButton>Let's Talk</ContactFormButton>
      </HomeMain>
      <HomeTopics />
      <HomeAside viewport={viewport}>
        <HomeVideo thumbnail={thumbnail} homeVideoId={homeVideoId} />
        <FeaturedProjects projects={featuredProjects} />
        <AboutLink image={aboutUsImage} />
      </HomeAside>
    </StyledHomePage>
  );
};

const StyledHomePage = styled.div`
  ${media.break`
    display: flex;
    height: ${({ viewport }) => viewport.height}px;
    .block-content {
      padding-right: 185px;
    }
  `}
`;

const HomeMain = styled.main`
  background-image: ${({ bg }) => `url(${bg})`};
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.orange};
  padding: 1rem;
  margin-bottom: ${({ topicHeight, viewport }) =>
    `${viewport.width * 0.33 + topicHeight}px`};
  ${media.break`
    flex: 0 0 60%;
    max-width: 60%;
    height: 100%;
    padding-top: 10rem;
    margin-bottom: 0;
  `}
`;

const HomeAside = styled.aside`
  ${media.break`
    flex: 0 0 40%;
    max-width: 40%;
    display: flex;
    flex-direction: column;
  `}
`;

export default HomePage;
