import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleCollection from '../components/Collection/SingleCollection';

const latestCollection = ({ data, pageContext }) => {
  console.log(data);
  const { project, slug } = pageContext;
  return (
    <Wrapper
      seo={data.sanityLatestCollection.seoSettings}
      pageTitle={data.sanityLatestCollection.title}
    >
      <SingleCollection
        projects={data.allSanityProject.edges.map(({ node }) => ({ ...node }))}
        {...data.sanityLatestCollection}
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
          fluid(maxWidth: 1000) {
            ...GatsbySanityImageFluid
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
