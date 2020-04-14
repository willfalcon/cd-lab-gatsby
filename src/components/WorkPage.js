import React from 'react';
import Loadable from '@loadable/component';
import { useStaticQuery, graphql } from 'gatsby';

import PageLayout from './PageLayout';
import Heading from './Heading';
import Content from './Content';
import Topics from './Topics/Topics';

import useSiteContext from './SiteContext';
import theme from './theme';

const ProjectCarousel = Loadable(() =>
  import('./Projects/ProjectCarousel/ProjectCarousel')
);
const ProjectMasonry = Loadable(() =>
  import('./Projects/ProjectMasonry/ProjectMasonry')
);

const WorkPage = ({ title, _rawBody, id, seoSettings, services }) => {
  const allStuff = useSiteContext();
  // console.log(allStuff);
  const { viewport } = allStuff;
  const mobile = viewport.width < theme.sizes.break;

  const { allSanityProject } = useStaticQuery(graphql`
    {
      allSanityProject {
        edges {
          node {
            id
            title
            images {
              _key
              asset {
                fluid(maxWidth: 500) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            categories {
              id
              slug {
                current
              }
            }
          }
        }
      }
    }
  `);

  const allProjects = allSanityProject.edges.map(edge => ({ ...edge.node }));
  console.log({ projects: allProjects.length });
  // console.log(services);
  // console.log(allProjects);

  const projects = services
    .map(service => {
      const serviceProjects = allProjects.filter(
        project =>
          project.categories.findIndex(cat => cat.id === service.id) !== -1
      );
      const firstProject = serviceProjects.filter(
        project => project.images.length
      )[0];
      return { ...service, firstProject };
    })
    .filter(service => {
      return (
        ((service.firstProject && service.firstProject.images) ||
          service.mainImage) &&
        !service._id.startsWith('drafts')
      );
    })
    .map(
      ({ id, _id, title, slug, firstProject, mainImage, forceCoverImage }) => {
        const images =
          forceCoverImage && mainImage
            ? [mainImage]
            : mainImage
            ? [mainImage]
            : firstProject.images;
        return { title, slug, images, _id, id, firstProject, forceCoverImage };
      }
    );
  console.log(projects);

  return (
    <PageLayout className="work-page">
      <div className="main">
        <Heading>{title}</Heading>
        {mobile && <ProjectCarousel projects={projects} />}
        <div className="content">
          {_rawBody && <Content>{_rawBody}</Content>}
        </div>
      </div>
      <Topics />
      {!mobile && <ProjectMasonry projects={projects} workpage />}
    </PageLayout>
  );
};

export default WorkPage;
