import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleCollection from '../components/Collection/SingleCollection';
import Meta from '../components/Meta';

const singleCollection = ({ data, pageContext, location }) => {
  const { project, slug } = pageContext;
  const { sanityCollection } = data;
  return (
    <Wrapper
      seo={sanityCollection.seoSettings}
      pageTitle={sanityCollection.title}
    >
      <Meta
        title={sanityCollection.title}
        seo={sanityCollection.seoSettings}
        image={
          sanityCollection.mainImage && sanityCollection.mainImage.asset.src
        }
        location={location}
      />
      <SingleCollection {...sanityCollection} project={project} slug={slug} />
    </Wrapper>
  );
};

export const SingleCollectionQuery = graphql`
  query SingleCollectionQuery($slug: String!) {
    sanityCollection(slug: { current: { eq: $slug } }) {
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
      projects {
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
`;

export default singleCollection;
