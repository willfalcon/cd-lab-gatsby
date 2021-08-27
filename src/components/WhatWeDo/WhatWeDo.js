import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Loadable from '@loadable/component';
import PageLayout from '../PageLayout';
import Img from 'gatsby-image';
import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';

import Heading from '../Heading';

import WhatWeDoTopic from './WhatWeDoTopic';

import useSiteContext from '../SiteContext';
import theme, { media } from '../theme';
import { useScrollSnap } from '../hooks';

const ProjectCarousel = Loadable(() => import('../Projects/ProjectCarousel/ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('./ProjectMasonry'));
const ServiceList = Loadable(() => import('./ServiceList'));

function fullHeight(el) {
  if (!el) {
    return null;
  }
  const height = el.offsetHeight;
  const elmMargin =
    parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-top')) +
    parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-bottom')) +
    'px';
  return height + elmMargin;
}

const WhatWeDo = ({ allSanityTopic }) => {
  const { viewport } = useSiteContext();

  const mobile = viewport.width < theme.sizes.break;
  const topics = allSanityTopic.edges.map(({ node }) => ({ ...node }));
  // console.log(topics);
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  // console.log(activeTopic);
  const dynamicProjects = topics.filter(topic => topic.id === activeTopic)[0].collection.projects;
  const projects = topics[0].collection.projects;
  // console.log(projects);

  let services = [];
  if (dynamicProjects && dynamicProjects.length > 0) {
    dynamicProjects.forEach(project => {
      if (project.categories) {
        project.categories.forEach(cat => {
          services.push(cat);
        });
      }
    });
  }
  // console.log(services);
  const titleRef = useRef(null);
  const container = useRef(null);
  // const ref = useScrollSnap(fullHeight(titleRef.current));

  return (
    <PageLayout className="what-we-do width-50" collection style={{ height: '100%' }}>
      <Main className="main">
        <TopicsContainer
          className="main-container"
          viewport={viewport}
          ref={container}
          container={container}
        >
          <Heading ref={titleRef}>What We Do</Heading>
          {mobile && <ProjectCarousel projects={projects} />}
          <div className="content">
            {topics.map(topic => {
              return (
                <WhatWeDoTopic
                  key={topic.id}
                  active={topic.id === activeTopic}
                  title={titleRef}
                  {...topic}
                  setActiveTopic={setActiveTopic}
                />
              );
            })}
          </div>
        </TopicsContainer>
      </Main>
      <ServiceList services={uniqWith(services, isEqual)} titleRef={titleRef} />
      {!mobile && <ProjectMasonry projects={projects} whatWeDo />}
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
`}/* box-sizing: content-box; */
`;

export default WhatWeDo;
