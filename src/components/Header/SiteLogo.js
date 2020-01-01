import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { media } from '../theme';
import Square from '../../images/cd-new-square.png';
import Logo from '../../images/cd-logo-h.png';

const SiteLogo = ({ home }) => {
  const images = useStaticQuery(graphql`
    {
      homeLogo: file(relativePath: { eq: "cd-type-padded.png" }) {
        id
        childImageSharp {
          fixed(width: 387) {
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
    <>
      {home && (
        <HomeLogoWrap to="/" className="home-wrap">
          <Img
            fixed={images.homeLogo.childImageSharp.fixed}
            alt="Creative Distillery"
            className="home-logo"
            fadeIn={false}
          />
        </HomeLogoWrap>
      )}
      <StyledLogoLink to="/" className="site-logo">
        <SquareLogo
          className="square"
          src={Square}
          alt="Creative Distillery Icon"
        />
        <FullLogo className="full" src={Logo} alt="Creative Distillery" />
      </StyledLogoLink>
    </>
  );
};

const HomeLogoWrap = styled(Link)`
  background: white;
  display: none;
  cursor: pointer;
  ${media.break`
    flex-grow: 1;
    line-height: 1;
    z-index: 6;
    display: block;
    height: 75px;
    width: 387px;
    position: absolute;
    top: 0;
    left: ${75 + 10}px;
    background: transparent;
  `}
`;

const StyledLogoLink = styled(Link)`
  flex-grow: 1;
  cursor: pointer;
  ${media.break`
    position: fixed;
    top: 25px;
    width: 75px;
    height: 75px;
    left: 0;
    z-index: 1;
  `}
  line-height: 1;
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
