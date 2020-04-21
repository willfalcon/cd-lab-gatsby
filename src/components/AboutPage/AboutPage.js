import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import Content from '../Content';
import ContactFormButton from '../ContactFormButton';

import People from './People';
import Topics from '../Topics/Topics';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const AboutPage = ({ title, _rawBody, people }) => {
  const { viewport } = useSiteContext();

  return (
    <StyledAboutPage className="about" viewport={viewport}>
      <AboutMain className="about-main">
        <Heading className="about__heading">{title}</Heading>
        <Content className="about__content">{_rawBody}</Content>
        <ContactFormButton>Start a Project</ContactFormButton>
      </AboutMain>
      <Topics />
      <AboutAside className="about-aside" viewport={viewport}>
        <People people={people} />
      </AboutAside>
    </StyledAboutPage>
  );
};

const StyledAboutPage = styled.div`
  ${media.break`
    display: flex;
    padding: 0;
    height: ${({ viewport }) => viewport.height}px;
  `}
`;

const AboutMain = styled.main`
  padding: 1rem;
  ${media.break`
    flex: 0 0 50%;
    max-width: 50%;
    height: 100%;
    padding: 5% 11rem;
    overflow: scroll;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    ${({ theme }) =>
      theme.grid &&
      `
      flex: 1 1 auto;
      padding-right: 8rem;
      max-width: 100%;
    `}
  `}
`;

const AboutAside = styled.aside`
  ${media.break`
    flex: 0 0 50%;
    max-width: 50%;
    height: 100%;
    ${({ theme, viewport }) =>
      theme.grid &&
      `
      flex: 0 0 ${viewport.height * 0.556}px; 
        max-width: ${viewport.height * 0.556}px;
    `}
  `}
  ${media.large`
    ${({ theme, viewport }) =>
      theme.grid &&
      `
      flex: 0 0 ${viewport.height * 0.875}px;
      max-width: ${viewport.height * 0.875}px;
    `}
  `}
`;

export default AboutPage;
