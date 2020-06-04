import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Post from '../components/Post';

const post = ({ data }) => {
  return (
    <Wrapper
      seo={data.sanityPost.seoSettings}
      pageTitle={data.sanityPost.title}
    >
      <Post {...data.sanityPost} />
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
        alt
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
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
