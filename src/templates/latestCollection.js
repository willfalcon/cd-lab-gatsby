import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleCollection from '../components/Collection/SingleCollection';
import Meta from '../components/Meta';

const latestCollection = ({ data, pageContext, location }) => {
  const { project, slug } = pageContext;
  const { sanityLatestCollection, allSanityProject } = data;
  return (
    <Wrapper
      seo={sanityLatestCollection.seoSettings}
      pageTitle={sanityLatestCollection.title}
    >
      <Meta
        title={sanityLatestCollection.title}
        seo={sanityLatestCollection.seoSettings}
        image={
          sanityLatestCollection.mainImage &&
          sanityLatestCollection.mainImage.asset.ogImage.src
        }
        location={location}
      />
      <SingleCollection
        projects={allSanityProject.edges.map(({ node }) => ({ ...node }))}
        {...sanityLatestCollection}
        project={project}
        slug={slug}
      />
    </Wrapper>
  );
};

export const LatestCollectionQuery = graphql`
  query LatestCollectionQuery($numProjects: Int!) {
    sanityLatestCollection {
      id
      title
      _rawDescription(resolveReferences: { maxDepth: 10 })
      seoSettings {
        metaDescription
        title
        canonicalUrl
      }
      mainImage {
        asset {
          mainImage: fluid(maxWidth: 1000) {
            ...GatsbySanityImageFluid
          }
          ogImage: fixed(width: 1000) {
            ...GatsbySanityImageFixed
          }
        }
      }
      slug {
        current
      }
    }
    allSanityProject(
      limit: $numProjects
      sort: { fields: _createdAt, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          noCover
          categories {
            id
            title
            slug {
              current
            }
          }
          images {
            _key
            asset {
              extension
              fluid(maxWidth: 1000) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawDescription(resolveReferences: { maxDepth: 10 })
          videoID
          videoThumbnail {
            id
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default latestCollection;
