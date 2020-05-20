import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { media } from '../theme';
import Square from '../../images/cd-new-square.png';
import Logo from '../../images/cd-logo-h.png';

const SiteLogo = ({ home }) => {
  const HomeLogo = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "cd-logo-h.png" }) {
        id
        childImageSharp {
          fixed(height: 75) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `);
  return (
    <StyledLogoLink to="/" className="site-logo" home={home}>
      {/* {home && ( */}
      <Img
        className="full-logo"
        fixed={HomeLogo.file.childImageSharp.fixed}
        alt="Creative Distillery logo"
        style={{ maxWidth: 'calc(100vh - 75px)' }}
      />
      {/* )} */}
      <SquareLogo
        className="square"
        src={Square}
        alt="Creative Distillery Icon"
      />
      <FullLogo className="full" src={Logo} alt="Creative Distillery" />
    </StyledLogoLink>
  );
};
const StyledLogoLink = styled(Link)`
  flex-grow: 1;
  cursor: pointer;
  line-height: 1;
  .full-logo {
    display: none !important;
  }
  ${media.break`
    position: fixed;
    top: 25px;
    width: 75px;
    height: 75px;
    left: 0;
    z-index: 1;
    .full-logo {
      display: inline-block !important;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    position: static;
    width: 100%;
    max-width: calc(100% - 150px);
    margin-left: auto;
    margin-right: auto;
    height: auto;
    .square {
      display: none;
    }
    ${({ home }) =>
      home &&
      `
    `}
  `}
  ${({ home }) =>
    home &&
    `
    .full {
      // display: none;
    }
    ${media.break`
      position: static;
      
    `}
  `}
`;

const SquareLogo = styled.img`
  display: none;
  ${media.break`
    display: block;
  `}
`;

const FullLogo = styled.img`
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-60%);
  ${media.break`
    display: none;
  `}
`;

export default SiteLogo;
