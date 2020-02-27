import React from 'react';
import Loadable from '@loadable/component';

import PageLayout from './PageLayout';
import Heading from './Heading';
import Content from './Content';
import ServiceList from './ServiceList';
import Topics from './Topics/Topics';

import useSiteContext from './SiteContext';
import theme from './theme';

const ProjectCarousel = Loadable(() => import('./Projects/ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('./Projects/ProjectMasonry'));

const SingleCollection = ({ title, _rawDescription, projects }) => {
  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;
  console.log(projects);
  return (
    <PageLayout collection className="single-collection">
      <div className="main">
        <Heading>{title}</Heading>
        <ServiceList projects={projects} />
        {mobile && <ProjectCarousel projects={projects} />}
        <div className="content">
          {_rawDescription && <Content>{_rawDescription}</Content>}
          {/* TODO: ContactFormButton */}
        </div>
      </div>
      <Topics />
      {!mobile && <ProjectMasonry projects={projects} />}
    </PageLayout>
  );
};

export default SingleCollection;
