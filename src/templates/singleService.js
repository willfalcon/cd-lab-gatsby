import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleService from '../components/SingleService/SingleService';

const singleService = ({ data, pageContext }) => {
  const project = pageContext.project;
  return (
    <Wrapper>
      <SingleService
        {...data.sanityCategory}
        projects={data.allSanityProject.edges.map(edge => ({ ...edge.node }))}
        services={data.allSanityCategory.edges.map(edge => ({ ...edge.node }))}
        project={project}
      />
    </Wrapper>
  );
};

export const SingleServiceQuery = graphql`
  query SingleServiceQuery($slug: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      id
      _rawDescription
      seoSettings {
        canonicalUrl
        metaDescription
        title
      }
      forceCoverImage
      title
    }
    allSanityProject(
      filter: {
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
      sort: { fields: publishedAt, order: ASC }
    ) {
      edges {
        node {
          id
          title
          publishedAt
          images {
            _key
            asset {
              fluid(maxWidth: 1000) {
                ...GatsbySanityImageFluid
              }
            }
          }
          noCover
          categories {
            title
            slug {
              current
            }
            id
          }
          _rawDescription
          videoID
          slug {
            current
          }
        }
      }
    }
    allSanityCategory {
      edges {
        node {
          slug {
            current
          }
          id
          title
        }
      }
    }
  }
`;

export default singleService;
