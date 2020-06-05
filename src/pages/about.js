import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import AboutPage from '../components/AboutPage/AboutPage';
import Meta from '../components/Meta';

const index = ({ data, location }) => {
  return (
    <Wrapper
      seo={data.sanityAboutPage.seoSettings}
      pageTitle={data.sanityAboutPage.title}
    >
      <Meta
        title="About"
        seo={data.sanityAboutPage.seoSettings}
        // image={data.sanityHomePage.aboutUsImage.asset.ogImage.src}
        location={location}
      />
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
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
    allSanityPerson(sort: { order: ASC, fields: _createdAt }) {
      edges {
        node {
          id
          _rawBio(resolveReferences: { maxDepth: 10 })
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
