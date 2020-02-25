import React from 'react';
import Loadable from '@loadable/component';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
import ServicePagination from './ServicePagination';
import ContactFormButton from '../ContactForm/ContactFormButton';

import useSiteContext from '../SiteContext';
import theme from '../theme';

const ProjectCarousel = Loadable(() => import('../Projects/ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('../Projects/ProjectMasonry'));

const SingleService = ({ title, _rawDescription, services, id, projects }) => {
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
        {mobile && <ProjectCarousel projects={projects} />}
        <div className="content">
          {_rawDescription && <Content>{_rawDescription}</Content>}
          <ContactFormButton>Let's Talk</ContactFormButton>
          <ServicePagination prev={services[prev]} next={services[next]} />
        </div>
      </div>
      {!mobile && <ProjectMasonry projects={projects} />}
    </PageLayout>
  );
};

export default SingleService;
