import React from 'react';
import styled from 'styled-components';

import FluidImg from '../FluidImg';
import Content from '../Content';
import Button from '../Button';
import ContactFormButton from '../ContactFormButton';
import WhatWeDo from './WhatWeDo';
import AboutSection from './AboutSection';
import InsightsSection from './InsightsSection';
import HomeFooter from './HomeFooter';

const NewHomePage = ({
  _rawBody,
  _rawNewBody,
  _rawAboutCopy,
  mainImage,
  homeVideoId,
  thumbnail,
  featuredProjects,
  aboutUsImage,
  logoBadge,
}) => {
  return (
    <HomeContainer className="container">
      <FluidImg
        src="home-hero"
        fluid={aboutUsImage.asset.fluid}
        {...aboutUsImage}
        assetId={aboutUsImage.asset.assetId}
        alt="The Creative Distillery Team"
      />
      <main className="home-main">
        <Content className="home-content">{_rawNewBody}</Content>
        <Button className="home-work-button" href="/work">
          View Work
        </Button>
        <ContactFormButton className="home-contact-button">
          Get Started
        </ContactFormButton>
      </main>
      <WhatWeDo />
      <AboutSection
        copy={_rawAboutCopy}
        thumbnail={thumbnail}
        video={homeVideoId}
      />
      <InsightsSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  position: relative;
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
      margin: 0 1rem;
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

export default NewHomePage;
