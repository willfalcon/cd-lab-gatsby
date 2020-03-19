import React, { useEffect } from 'react';
import { graphql, navigate } from 'gatsby';

const random = ({ data }) => {
  
  const { allSanityCategory: { edges } } = data;
  
  
  
  const random = edges[Math.floor(Math.random() * edges.length)]
  
  navigate(`/service/${random.node.slug.current}`);
  return (
    <div>
      
    </div>
  );
};

export const AllServiceQuery = graphql`
  query allServiceQuery {
    allSanityCategory {
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