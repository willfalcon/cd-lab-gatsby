import React, { useRef } from 'react';
import styled from 'styled-components';

import Content from '../Content';
import HomeTopics from './HomeTopics';

import theme, { media } from '../theme';
import useSiteContext from '../SiteContext';

const HomePage = ({ _rawBody, mainImage }) => {
  const mainRef = useRef(null);
  const { viewport } = useSiteContext();

  return (
    <StyledHomePage className="container homepage" viewport={viewport}>
      <HomeMain
        className="homepage-main"
        viewport={viewport}
        bg={mainImage.asset.url}>
        <Content>{_rawBody}</Content>
      </HomeMain>
      <HomeTopics />
      <HomeAside></HomeAside>
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
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

export default HomePage;
