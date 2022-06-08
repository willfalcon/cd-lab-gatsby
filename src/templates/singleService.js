import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleService from '../components/SingleService/SingleService';
import Meta from '../components/Meta';

const singleService = ({ data, pageContext, location }) => {
  const project = pageContext.project;
  const slug = pageContext.slug;
  const { sanityCategory, allSanityProject, allSanityCategory } = data;
  return (
    <Wrapper seo={sanityCategory.seoSettings} pageTitle={sanityCategory.title} location={location}>
      <Meta
        title={sanityCategory.title}
        seo={sanityCategory.seoSettings}
        image={sanityCategory.mainImage && sanityCategory.mainImage.asset.ogImage.src}
        location={location}
      />
      <SingleService
        {...sanityCategory}
        projects={allSanityProject.edges.map(edge => ({ ...edge.node }))}
        services={allSanityCategory.edges.map(edge => ({ ...edge.node }))}
        project={project}
        slug={slug}
      />
    </Wrapper>
  );
};

export const SingleServiceQuery = graphql`
  query SingleServiceQuery($slug: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      id
      _rawDescription(resolveReferences: { maxDepth: 10 })
      seoSettings {
        canonicalUrl
        metaDescription
        title
      }
      forceCoverImage
      mainImage {
        asset {
          mainImage: fluid(maxWidth: 1000) {
            ...GatsbySanityImageFluid
          }
          ogImage: fixed(width: 1200) {
            ...GatsbySanityImageFixed
          }
        }
      }
      title
    }
    allSanityProject(
      filter: { categories: { elemMatch: { slug: { current: { eq: $slug } } } } }
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
              extension
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
          _rawDescription
          mainImage {
            _type
          }
        }
      }
    }
  }
`;

export default singleService;
