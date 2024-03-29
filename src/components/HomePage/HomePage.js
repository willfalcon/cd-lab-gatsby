import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import FluidImg from '../FluidImg';
import Content from '../Content';
import Button from '../Button';
import ContactFormButton from '../ContactFormButton';
import WhatWeDo from './WhatWeDo';
import AboutSection from './AboutSection';
import InsightsSection from './InsightsSection';

import { media, grid } from '../theme';
import { useScrollSnap } from '../hooks';

const HomePage = ({ _rawNewBody, _rawAboutCopy, homeVideoId, thumbnail, aboutUsImage }) => {
  const container = useScrollSnap();
  return (
    <HomeContainer className="container" ref={container}>
      <div className="home-first-section">
        <FluidImg
          className="home-hero"
          fluid={aboutUsImage.asset.mainImage}
          {...aboutUsImage}
          assetId={aboutUsImage.asset.assetId}
          alt="The Creative Distillery Team"
        />
        <main className="home-main">
          <Content className="home-content">{_rawNewBody}</Content>
          <Button className="home-work-button" href="/work">
            View Work
          </Button>
          <ContactFormButton className="home-contact-button">Get Started</ContactFormButton>
        </main>
      </div>
      <WhatWeDo />
      <AboutSection copy={_rawAboutCopy} thumbnail={thumbnail} video={homeVideoId} />
      <InsightsSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  position: relative;

  .home-first-section {
    ${media.break`
    height: calc(100vh - 78px);
    > div {
      max-height: 100%;
    }
      ${grid.enabled`
        display: grid;
        grid-template-rows: auto 1fr;
        align-items: center;
      `}
    `}
  }

  .home-main {
    padding: 1rem;
    width: ${({ theme }) => theme.sizes.content}px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: row wrap;
    min-height: auto;
    justify-content: center;
    .button {
      margin: 0 1rem 1rem;
    }
  }
  .home-content {
    text-align: center;
    padding: 2rem 0;
    flex: 0 0 100%;
    p {
      font-size: 2.8rem;
      line-height: 1.5;
    }
  }
`;

export default HomePage;
