import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { media } from '../theme';

const SiteLogo = ({ home }) => {
  const images = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "cd-type-padded.png" }) {
        id
        childImageSharp {
          fixed(width: 387) {
            base64
            tracedSVG
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
            originalName
          }
        }
      }
    }
  `);

  console.log(images);

  return (
    <>
      {home && (
        <Link href="/">
          <HomeLogoWrap className="home-wrap">
            {/* <img
              className="home-logo"
              src="/cd-type-padded.png"
              alt="Creative Distillery"
            /> */}
            <Img
              fixed={images.file.childImageSharp.fixed}
              alt="Creative Distillery"
            />
          </HomeLogoWrap>
        </Link>
      )}
      <Link href="/">
        <StyledLogoLink className="site-logo">
          <SquareLogo
            className="square"
            src="/cd-new-square.png"
            alt="Creative Distillery Icon"
          />
          <FullLogo
            className="full"
            src="/cd-logo-h.png"
            alt="Creative Distillery"
          />
        </StyledLogoLink>
      </Link>
    </>
  );
};

const StyledLogoLink = styled.a`
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

const HomeLogoWrap = styled.a`
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
