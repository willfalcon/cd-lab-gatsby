import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import FluidImg from '../FluidImg';
import Content from '../Content';
import Button from '../Button';
import ContactFormButton from '../ContactFormButton';
import WhatWeDo from './WhatWeDo';
import AboutSection from './AboutSection';
import InsightsSection from './InsightsSection';

import Topics from '../Topics/Topics';

import { media, grid } from '../theme';

const HomePage = ({
  _rawNewBody,
  _rawAboutCopy,
  homeVideoId,
  thumbnail,
  aboutUsImage,
}) => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const gatsbyContainer = document.getElementById('___gatsby');

    if (container.current) {
      const children = container.current.children;
      Array.from(children).forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        console.log(rect);
        const header = i === 0 ? 78 : 0;
        const scrollChild = document.createElement('div');
        scrollChild.style.width = `${rect.width}px`;
        scrollChild.style.height = `${rect.height + header}px`;
        scrollChild.style.position = 'relative';
        scrollChild.style.scrollSnapAlign = 'center';
        scrollChild.style.pointerEvents = 'none';
        scrollChild.classList.add('scroll-anchor');
        document.body.appendChild(scrollChild);
      });
      gatsbyContainer.style.position = 'absolute';
      document.body.style.scrollSnapType = 'y proximity';
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'scroll';
      document.body.style.position = 'relative';
      document.documentElement.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      const scrollAnchors = document.querySelectorAll('.scroll-anchor');
      Array.from(scrollAnchors).forEach(el => el.parentNode.removeChild(el));
      gatsbyContainer.removeAttribute('style');
      document.body.removeAttribute('style');
      document.documentElement.removeAttribute('style');
    };
  }, []);

  return (
    <>
      <HomeContainer className="container" ref={container}>
        <div className="home-first-section">
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
        </div>
        <WhatWeDo />
        <AboutSection
          copy={_rawAboutCopy}
          thumbnail={thumbnail}
          video={homeVideoId}
        />
        <InsightsSection />
      </HomeContainer>
      <Topics />
    </>
  );
};

const HomeContainer = styled.div`
  position: relative;

  .home-first-section {
    ${media.break`
      height: calc(100vh - 78px);
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

export default HomePage;
