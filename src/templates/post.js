import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Post from '../components/Post';

const post = ({ data }) => {
  return (
    <Wrapper seo={data.sanityPost.seoSettings} pageTitle={data.sanityPost.title}>
      <Post {...data.sanityPost} />
    </Wrapper>
  );
};

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      id
      title
      _rawBody
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
      }
      publishedAt(formatString: "MM.DD.YY")
      seoSettings {
        metaDescription
        title
        canonicalUrl
      }
    }
  }
`;

export default post;
