import React, { useEffect } from 'react';
import { graphql, navigate } from 'gatsby';

const RandomCollection = ({ data }) => {
  
  const { allSanityCollection: { edges } } = data;
  
  useEffect(() => {
    const eligibles = edges.filter(edge => !edge.node.hidden);
    const random = eligibles[Math.floor(Math.random() * eligibles.length)];
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
          hidden
          title
        }
      }
    }
  }
`;

export default RandomCollection;