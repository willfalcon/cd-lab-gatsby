import React from 'react';
import Loadable from '@loadable/component';
import StickyBox from 'react-sticky-box';

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

  function getPrevAndNext() {
    const filteredServices = services.filter(
      service => service.mainImage || service._rawDescription
    );
    const index = services.findIndex(service => service.id === id);
    const filteredIndex = filteredServices.findIndex(
      service => service.id === id
    );

    if (filteredIndex < 0) {
      const len = services.length;
      let next = (index + len - 1) % len;
      let prev = (index + 1) % len;
      while (!services[next].mainImage && !services[next]._rawDescription) {
        next = (next + len - 1) % len;
      }
      while (!services[prev].mainImage && !services[prev]._rawDescription) {
        prev = (prev + 1) % len;
      }
      return {
        next,
        prev,
      };
    }

    const len = filteredServices.length;
    return {
      next: (filteredIndex + len - 1) % len,
      prev: (filteredIndex + 1) % len,
    };
  }

  const { next, prev } = getPrevAndNext();

  return (
    <PageLayout className="single-service">
      <main className="main">
        <StickyBox className="main-container">
          <Heading>{title}</Heading>
          {mobile && <ProjectCarousel projects={projects} project={project} slug={slug} service />}
          <div className="content">
            {_rawDescription && <Content>{_rawDescription}</Content>}
            <ContactFormButton>Start a Project</ContactFormButton>
            <ServicePagination prev={services[prev]} next={services[next]} />
          </div>
        </StickyBox>
      </main>
      <Topics />
      {(forceCoverImage || !projects.length) && mainImage ? (
        <ServiceCoverImage className="service-cover-image" image={mainImage.asset.mainImage} />
      ) : (
        !mobile && <ProjectMasonry projects={projects} project={project} slug={slug} service />
      )}
    </PageLayout>
  );
};

export default SingleService;
