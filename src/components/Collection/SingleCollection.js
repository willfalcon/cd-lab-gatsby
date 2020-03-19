import React, { useRef, useState, useLayoutEffect } from 'react';
import Loadable from '@loadable/component';

import PageLayout from '../PageLayout';
import Heading from '../Heading';
import Content from '../Content';
// import ServiceList from './ServiceList';
import Topics from '../Topics/Topics';
import ContactFormButton from '../ContactForm/ContactFormButton';

import useSiteContext from '../SiteContext';
import theme from '../theme';

const ProjectCarousel = Loadable(() => import('../Projects/ProjectCarousel'));
const ProjectMasonry = Loadable(() => import('../Projects/ProjectMasonry'));
const ServiceList = Loadable(() => import('./ServiceList'));

const SingleCollection = ({ title, _rawDescription, projects, project, slug }) => {
  const viewport = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;

  const titleRef = useRef(null);
  console.log({titleRef});
  const [titleHeight, setTitleHeight] = useState(0);
  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
  });
  return (
    <PageLayout collection className="single-collection">
      <div className="main">
        <Heading ref={titleRef}>{title}</Heading>
        <ServiceList
          projects={projects}
          titleHeight={titleHeight}
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
