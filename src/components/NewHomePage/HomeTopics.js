import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import useSiteContext from '../SiteContext';
import HomeTopic from './HomeTopic';

const HomeTopics = () => {
  const { topics } = useSiteContext();

  return (
    <TopicsContainer className="home-topics">
      {topics.map((topic, index) => (
        <HomeTopic {...topic.node} index={index} key={topic.node.id} />
      ))}
    </TopicsContainer>
  );
};

const TopicsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 1200px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`;
export default HomeTopics;
