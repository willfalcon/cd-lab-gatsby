import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Post from '../components/Post';

const post = ({ data }) => {
  return (
    <Wrapper>
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
    }
  }
`;

export default post;
