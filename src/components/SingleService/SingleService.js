import React from 'react';
import Loadable from '@loadable/component';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
import ServicePagination from './ServicePagination';
import ServiceCoverImage from './ServiceCoverImage';
import ContactFormButton from '../ContactFormButton';
import Topics from '../Topics/Topics';

import useSiteContext from '../SiteContext';
import theme from '../theme';

const ProjectCarousel = Loadable(() =>
  import('../Projects/ProjectCarousel/ProjectCarousel')
);
const ProjectMasonry = Loadable(() =>
  import('../Projects/ProjectMasonry/ProjectMasonry')
);

const SingleService = ({
  title,
  _rawDescription,
  services,
  id,
  slug,
  projects,
  project,
  forceCoverImage,
  mainImage,
}) => {
  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;

  const index = services.findIndex(service => service.id === id);
  const len = services.length;
  const next = (index + len - 1) % len;
  const prev = (index + 1) % len;

  return (
    <PageLayout className="single-service">
      <div className="main">
        <Heading>{title}</Heading>
        {mobile && (
          <ProjectCarousel
            projects={projects}
            project={project}
            slug={slug}
            service
          />
        )}
        <div className="content">
          {_rawDescription && <Content>{_rawDescription}</Content>}
          <ContactFormButton>Let's Talk</ContactFormButton>
          <ServicePagination prev={services[prev]} next={services[next]} />
        </div>
      </div>
      <Topics />
      {(forceCoverImage || !projects.length) && mainImage ? (
        <ServiceCoverImage className="service-cover-image" image={mainImage} />
      ) : (
        !mobile && (
          <ProjectMasonry
            projects={projects}
            project={project}
            slug={slug}
            service
          />
        )
      )}
    </PageLayout>
  );
};

export default SingleService;
