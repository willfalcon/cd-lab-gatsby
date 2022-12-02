import React from 'react';
import styled from 'styled-components';
import { useTrail, config } from 'react-spring';

import useSiteContext from '../SiteContext';
import HomeTopic from './HomeTopic';

const HomeTopics = ({ hasEnteredScreen }) => {
  const { topics } = useSiteContext();

  const topicsTrail = useTrail(topics.length, {
    opacity: hasEnteredScreen ? 1 : 0,
    config: config.molasses,
  });

  return (
    <TopicsContainer className="home-topics">
      {topicsTrail.map((props, index) => {
        const topic = topics[index];
        return <HomeTopic {...topic.node} index={index} key={topic.node.id} styles={props} />;
      })}
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
