import React, { useEffect } from 'react';
import { graphql, navigate } from 'gatsby';

const RandomPost = ({ data }) => {

  const { allSanityPost: { edges } } = data;

  useEffect(() => {
    const random = edges[Math.floor(Math.random() * edges.length)];
    navigate(`/post/${random.node.slug.current}`);
  });

  return (
    <div>
      
    </div>
  );
};

export const AllPostQuery = graphql`
  query allPostQuery {
    allSanityPost {
      edges {
        node {
          slug {
            current
          }
        }
      }
    }
  }
`;

export default RandomPost;