import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SingleService from '../components/SingleService/SingleService';

const singleService = ({ data }) => {
  return (
    <Wrapper>
      <SingleService
        {...data.sanityCategory}
        projects={data.allSanityProject.edges.map(edge => ({ ...edge.node }))}
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
        }
      }
    }
  }
`;

export default singleService;
