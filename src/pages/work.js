import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import WorkPage from '../components/WorkPage';
import Meta from '../components/Meta';

const work = ({ data, location }) => {
  return (
    <Wrapper seo={data.sanityWorkPage.seoSettings} pageTitle={data.sanityWorkPage.title} location={location}>
      <Meta
        title={data.sanityWorkPage.title}
        seo={data.sanityWorkPage.seoSettings}
        // image={data.sanityHomePage.aboutUsImage.asset.ogImage.src}
        location={location}
      />
      <WorkPage {...data.sanityWorkPage} services={data.allSanityCategory.edges.map(edge => ({ ...edge.node }))} />
    </Wrapper>
  );
};

export const WorkQuery = graphql`
  query workQuery {
    sanityWorkPage(_id: { eq: "workPage" }) {
      id
      _rawBody(resolveReferences: { maxDepth: 10 })
      title
      seoSettings {
        canonicalUrl
        metaDescription
        title
      }
    }
    allSanityCategory(filter: { hidden: { ne: true } }, sort: { fields: _createdAt, order: ASC }) {
      edges {
        node {
          id
          _id
          title
          forceCoverImage
          mainImage {
            _key
            asset {
              fluid(maxWidth: 500) {
                ...GatsbySanityImageFluid
              }
            }
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

export default work;
