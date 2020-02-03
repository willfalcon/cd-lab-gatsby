import React from 'react';
import Loadable from '@loadable/component';

import PageLayout from '../PageLayout';
import Heading from '../Heading';

import useSiteContext from '../SiteContext';
import theme from '../theme';

const ProjectCarousel = Loadable(() => import('../ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('../ProjectMasonry'));

const SingleService = ({ title }) => {
  const { viewport } = useSiteContext();

  const mobile = viewport.width < theme.sizes.break;

  return (
    <PageLayout className="single-service">
      <div className="main">
        <Heading>{title}</Heading>
        {mobile ? <ProjectCarousel /> : <ProjectMasonry />}
      </div>
    </PageLayout>
  );
};

export default SingleService;
