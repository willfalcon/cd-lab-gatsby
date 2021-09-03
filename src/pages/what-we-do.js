import React from 'react';
import { graphql } from 'gatsby';
import WhatWeDo from '../components/WhatWeDo/WhatWeDo';
import Wrapper from '../components/Wrapper';
import Meta from '../components/Meta';

const whatWeDo = ({ data, location }) => {
  return (
    <Wrapper whatWeDo>
      <Meta
        title="What We Do"
        // seo={data.sanityAboutPage.seoSettings}
        // image={data.sanityHomePage.aboutUsImage.asset.ogImage.src}
        location={location}
      />
      <WhatWeDo {...data} />
    </Wrapper>
  );
};

export const WhatWeDoQuery = graphql`
  query whatWeDoQuery {
    sanityWhatWeDo {
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
    allSanityTopic(sort: { order: ASC, fields: order }) {
      edges {
        node {
          id
          title
          _rawContent(resolveReferences: { maxDepth: 10 })
          _rawShortContent(resolveReferences: { maxDepth: 10 })

          whatWeDoImage {
            alt
            asset {
              fluid(maxWidth: 1000) {
                ...GatsbySanityImageFluid
              }
              metadata {
                lqip
                dimensions {
                  width
                  height
                  aspectRatio
                }
              }
              url
              assetId
            }
            crop {
              top
              left
              bottom
              right
            }
          }
          listBackgroundColor {
            hex
          }
          collection {
            slug {
              current
            }
          }
          categories {
            service {
              _id
              slug {
                current
              }
              title
            }
            deactivated
          }
        }
      }
    }
  }
`;

export default whatWeDo;
