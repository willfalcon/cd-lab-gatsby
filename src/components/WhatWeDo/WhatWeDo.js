import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Loadable from '@loadable/component';
import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';

import WhatWeDoTopic from './WhatWeDoTopic';

import useSiteContext from '../SiteContext';
import theme, { media } from '../theme';

const ServiceList = Loadable(() => import('./ServiceList'));

const WhatWeDo = ({ allSanityTopic, sanityWhatWeDo }) => {
  const { viewport } = useSiteContext();

  const mobile = viewport.width < theme.sizes.break;
  const topics = allSanityTopic.edges.map(({ node }) => ({ ...node }));
  // console.log(topics);
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  // console.log(activeTopic);

  const activeTopicObject = topics.filter(topic => topic.id == activeTopic)[0];
  const services = activeTopicObject.categories;
  const titleRef = useRef(null);
  const container = useRef(null);

  return (
    <PageLayout className="what-we-do" whatWeDo style={{ height: '100%' }}>
      <Main className="main">
        <TopicsContainer className="main-container" viewport={viewport} ref={container} container={container}>
          <div ref={titleRef}>
            <Heading className="what-we-do__heading">{sanityWhatWeDo.title}</Heading>
            {sanityWhatWeDo._rawBody && <Content className="what-we-do__content">{sanityWhatWeDo._rawBody}</Content>}
          </div>
          <div className="content">
            {topics.map((topic, i) => {
              return (
                <WhatWeDoTopic
                  key={topic.id}
                  active={topic.id === activeTopic}
                  title={titleRef}
                  {...topic}
                  setActiveTopic={setActiveTopic}
                  index={i}
                />
              );
            })}
          </div>
        </TopicsContainer>
      </Main>
      {!mobile && <ServiceList services={services} titleRef={titleRef} backgroundColor={activeTopicObject.listBackgroundColor.hex} />}
    </PageLayout>
  );
};

const Main = styled.main`
  overflow: hidden;
  position: relative;
`;

const TopicsContainer = styled.div`
  ${media.break`
    overflow-y: scroll;
    position: absolute !important;
    
    right: -${({ container }) => container.current?.offsetWidth - container.current?.clientWidth}px;
    top: 0;
    left: 0;
    bottom: 0;
  `}
  .what-we-do {
    &__content {
      padding: 0 3rem;
      ${media.break`
        padding: 0;
      `}
      * {
        font-size: 1.8rem;
      }
    }
  }
`;

export default WhatWeDo;
