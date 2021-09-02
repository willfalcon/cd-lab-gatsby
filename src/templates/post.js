import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Post from '../components/Post';
import Meta from '../components/Meta';

const post = ({ data, location }) => {
  return (
    <Wrapper seo={data.sanityPost.seoSettings} pageTitle={data.sanityPost.title}>
      <Post {...data.sanityPost} />
      <Meta
        title={data.sanityPost.title}
        seo={data.sanityPost.seoSettings}
        image={data.sanityPost.mainImage && data.sanityPost.mainImage.asset.ogImage.src}
        location={location}
        type="article"
      />
    </Wrapper>
  );
};

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
      mainImage {
        # alt
        asset {
          mainImage: fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
          ogImage: fixed(width: 1200) {
            ...GatsbySanityImageFixed
          }
        }
      }
      author {
        name
        _rawBio
        image {
          asset {
            fixed(width: 300) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
      publishedAt(formatString: "MM.DD.YY")
      seoSettings {
        metaDescription
        title
        canonicalUrl
      }
      categories {
        slug {
          current
        }
        title
        id
      }
    }
  }
`;

export default post;
