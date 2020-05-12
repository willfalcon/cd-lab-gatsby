import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { rgba } from 'polished';
import Img from 'gatsby-image';

import MenuToggle from './MenuToggle';
import SocialList from '../SocialList';
import Nav from './Nav';
import useSiteContext from '../SiteContext';
import { media } from '../theme';

import SiteLogo from './SiteLogo';

const Header = () => {
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
      fullLogo: file(relativePath: { eq: "cd-logo-h.png" }) {
        id
        childImageSharp {
          fixed(width: 800) {
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
  const { menuOpen, home, expandedTopic } = useSiteContext();
  return (
    <>
      {!home && (
        <HomeLogoWrap to="/" className="home-wrap">
          <Img
            fixed={images.homeLogo.childImageSharp.fixed}
            alt="Creative Distillery"
            className="home-logo"
            fadeIn={false}
          />
        </HomeLogoWrap>
      )}
      <StyledHeader
        topicsOpen={expandedTopic}
        menuOpen={menuOpen}
        className="header"
        home={home}
      >
        <SiteLogo home={home} />
        <MenuToggle />
        <SocialList className="header-social-list" />
        <Nav home={home} />
      </StyledHeader>
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
    /* z-index: 6; */
    display: block;
    height: 95px;
    width: calc(100vw * .4 - 75px);
    padding-bottom: 2rem;
    position: absolute;
    top: 0;
    left: ${75 + 10}px;
    background: ${({ theme }) =>
      `linear-gradient(
        ${'white'}, 
        ${'white'} 35%,
        ${'white'} 60%,
        ${rgba('white', 0)}
      )`};
      z-index: 1;
  `}
`;

const StyledHeader = styled.header`
  display: flex;
  z-index: 33;
  background: white;

  ${media.break`
    position: relative;
    flex-flow: column nowrap;
    width: 75px;
    background: transparent;
    z-index: ${({ topicsOpen, menuOpen }) => (topicsOpen && !menuOpen ? 8 : 9)};
    z-index: ${({ topicsOpen, menuOpen }) => (topicsOpen ? 8 : 10)};
    ${({ home }) =>
      home &&
      `
      position: relative;
      width: 100%;
      .menu-toggle {
        position: absolute;
        top: 0;
        left: 0;
      }
      .header-social-list {
        display: none;
      }
    `}
  `}
`;

export default Header;
