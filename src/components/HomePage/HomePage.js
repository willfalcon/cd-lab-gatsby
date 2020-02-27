import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Img from 'gatsby-image';

import Content from '../Content';
import Topics from '../Topics/Topics';
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
  logoBadge,
}) => {
  const { viewport } = useSiteContext();

  return (
    <StyledHomePage className="container homepage" viewport={viewport}>
      <HomeMain
        className="homepage-main"
        viewport={viewport}
        bg={mainImage ? mainImage.asset.url : null}
      >
        <Content>{_rawBody}</Content>
        <ContactFormButton>Let's Talk</ContactFormButton>
        {logoBadge && (
          <Img
            className="logo-badge"
            fluid={logoBadge.asset.fluid}
            alt={logoBadge.alt}
          />
        )}
      </HomeMain>
      <Topics home />
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
  .logo-badge {
    margin-top: 2rem;
  }
  ${media.break`
    display: flex;
    height: ${({ viewport }) => viewport.height}px;
    .block-content {
      padding-right: 185px;
    }
    .logo-badge {
      /* margin-right: 185px; */
      width: calc(100% - 185px);
      /* width: ${({ viewport }) => viewport.width * 0.6 - 185}px; */
    }
  `}
`;

const HomeMain = styled.main`
  ${({ bg }) =>
    bg &&
    `
    background-image: ${`url(${bg})`};
    background-size: cover;
    background-position: center;
  `}
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
    overflow: scroll;
  `}
`;

export default HomePage;
