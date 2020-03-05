import React from 'react';
import Loadable from '@loadable/component';

import PageLayout from './PageLayout';
import Heading from './Heading';
import Content from './Content';
import ServiceList from './ServiceList';
import Topics from './Topics/Topics';
import ContactFormButton from './ContactForm/ContactFormButton';

import useSiteContext from './SiteContext';
import theme from './theme';

const ProjectCarousel = Loadable(() => import('./Projects/ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('./Projects/ProjectMasonry'));

const SingleCollection = ({ title, _rawDescription, projects, project, slug }) => {
  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;
  return (
    <PageLayout collection className="single-collection">
      <div className="main">
        <Heading>{title}</Heading>
        <ServiceList
          projects={projects}
          right={
            (viewport.width - 100) * 0.6 - (viewport.width - 100) * 0.4 * 0.1
          }
          width={((viewport.width - 100) * 0.4) / 2}
        />
        {mobile && <ProjectCarousel projects={projects} />}
        <div className="content">
          {_rawDescription && <Content>{_rawDescription}</Content>}
          <ContactFormButton>Let's Talk</ContactFormButton>
        </div>
      </div>
      <Topics />
      {!mobile && <ProjectMasonry projects={projects} project={project} slug={slug} />}
    </PageLayout>
  );
};

export default SingleCollection;
