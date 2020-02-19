import React, { useState } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import Content from '../Content';
import HomeTopics from './HomeTopics';
import ContactFormButton from '../ContactForm/ContactFormButton';
import Loader from '../Loader';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const AsideLoader = styled(Loader)`
  position: absolute;
  background: ${({ theme }) => theme.offWhite};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeAside = loadable(() => import('./HomeAside'), {
  fallback: <AsideLoader />,
});

const HomePage = ({
  _rawBody,
  mainImage,
  homeVideoId,
  thumbnail,
  featuredProjects,
  aboutUsImage,
}) => {
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
      <StyledHomeAside>
        <HomeAside
          thumbnail={thumbnail}
          homeVideoId={homeVideoId}
          featuredProjects={featuredProjects}
          aboutUsImage={aboutUsImage}
        />
      </StyledHomeAside>
    </StyledHomePage>
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

export default HomePage;
