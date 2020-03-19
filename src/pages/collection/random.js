import React, { useEffect } from 'react';
import { graphql, navigate } from 'gatsby';

const random = ({ data }) => {
  
  const { allSanityCollection: { edges } } = data;
  
  useEffect(() => {
    const random = edges[Math.floor(Math.random() * edges.length)];
    navigate(`/collection/${random.node.slug.current}`);
  });
  
  return (
    <div>
      
    </div>
  );
};

export const SingleRandomCollectionQuery = graphql`
  query SingleRandomCollectionQuery {
    allSanityCollection {
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

export default random;