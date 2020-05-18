import React, { useRef } from 'react';
import Loadable from '@loadable/component';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
// import ServiceList from './ServiceList';
import Topics from '../Topics/Topics';
import ContactFormButton from '../ContactFormButton';

import useSiteContext from '../SiteContext';
import theme from '../theme';

const ProjectCarousel = Loadable(() =>
  import('../Projects/ProjectCarousel/ProjectCarousel')
);
const ProjectMasonry = Loadable(() =>
  import('../Projects/ProjectMasonry/ProjectMasonry')
);
const ServiceList = Loadable(() => import('./ServiceList'));

const SingleCollection = ({
  title,
  _rawDescription,
  projects,
  project,
  slug,
}) => {
  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;

  const titleRef = useRef(null);

  return (
    <PageLayout collection className="single-collection">
      <div className="main">
        <div className="main-container">
          <Heading ref={titleRef}>{title}</Heading>
          <ServiceList projects={projects} titleRef={titleRef} />
          {mobile && (
            <ProjectCarousel
              projects={projects}
              project={project}
              slug={slug}
            />
          )}
          <div className="content">
            {_rawDescription && <Content>{_rawDescription}</Content>}
            <ContactFormButton>Start a Project</ContactFormButton>
          </div>
        </div>
      </div>
      <Topics />
      {!mobile && (
        <ProjectMasonry projects={projects} project={project} slug={slug} />
      )}
    </PageLayout>
  );
};

export default SingleCollection;
