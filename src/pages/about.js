import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import AboutPage from '../components/AboutPage/AboutPage';

const index = ({ data }) => {
  return (
    <Wrapper seo={data.sanityAboutPage.seoSettings} pageTitle={data.sanityAboutPage.title}>
      <AboutPage
        {...data.sanityAboutPage}
        people={data.allSanityPerson.edges}
      />
    </Wrapper>
  );
};

export const AboutQuery = graphql`
  query aboutQuery {
    sanityAboutPage(_id: { eq: "aboutPage" }) {
      id
      title
      seoSettings {
        canonicalUrl
        metaDescription
        title
      }
      _rawBody
    }
    allSanityPerson(sort: { order: ASC, fields: _createdAt }) {
      edges {
        node {
          id
          _rawBio
          name
          primary
          position
          image {
            asset {
              fixed(width: 400, height: 400) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`;

export default index;
