import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleCollection from '../components/SingleCollection';

const singleCollection = ({ data }) => {
  return (
    <Wrapper>
      <SingleCollection {...data.sanityCollection} />
    </Wrapper>
  );
};

export const SingleCollectionQuery = graphql`
  query SingleCollectionQuery($slug: String!) {
    sanityCollection(slug: { current: { eq: $slug } }) {
      id
      title
      _rawDescription
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
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
        _rawDescription
        videoID
      }
    }
  }
`;

export default singleCollection;