import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import HomePage from '../components/HomePage/HomePage';

const index = ({ data }) => {
  return (
    <Wrapper home>
      <HomePage {...data.sanityHomePage} />
    </Wrapper>
  );
};

export const HomeQuery = graphql`
  query HomeQuery {
    sanityHomePage(_id: { eq: "homePage" }) {
      id
      title
      aboutUsImage {
        _key
        _type
        asset {
          url
        }
      }
      _rawBody
      mainImage {
        asset {
          url
        }
      }
      homeVideo
      homeVideoThumb
      featuredProjects {
        _key
        project {
          id
          title
          slug {
            current
          }
          _id
        }
        service {
          title
          slug {
            current
          }
          _id
        }
      }
    }
  }
`;

export default index;
