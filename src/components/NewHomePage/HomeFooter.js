import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const HomeFooter = () => {
  const HomeLogo = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "cd-logo-h.png" }) {
        id
        childImageSharp {
          fixed(height: 75) {
            base64
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
          }
        }
      }
    }
  `);
  return (
    <Footer>
      <Img
        className="full-logo"
        fixed={HomeLogo.file.childImageSharp.fixed}
        alt="Creative Distillery logo"
      />
    </Footer>
  );
};

const Footer = styled.footer`
  height: 500px;
  padding: 2rem;
  .full-logo {
    max-width: calc(100vh - 75px);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default HomeFooter;
