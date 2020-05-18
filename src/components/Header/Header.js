import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { rgba } from 'polished';
import Img from 'gatsby-image';

import MenuToggle from './MenuToggle';
import SocialList from '../SocialList';
import Nav from './Nav';
import SiteLogo from './SiteLogo';
import NewsletterButton from '../NewsletterButton';

import useSiteContext from '../SiteContext';
import { media } from '../theme';

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
      {/* {!home && (
        <HomeLogoWrap to="/" className="home-wrap">
          <Img
            fixed={images.homeLogo.childImageSharp.fixed}
            alt="Creative Distillery"
            className="home-logo"
            fadeIn={false}
          />
        </HomeLogoWrap>
      )} */}
      <StyledHeader
        topicsOpen={expandedTopic}
        menuOpen={menuOpen}
        className="header"
        home={home}
      >
        <SiteLogo home={home} />
        {home && (
          <NewsletterButton className="header-subscribe" plain>
            Subscribe
          </NewsletterButton>
        )}
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
    /* width: 75px; */
    background: transparent;
    z-index: ${({ topicsOpen, menuOpen }) => (topicsOpen && !menuOpen ? 8 : 9)};
    z-index: ${({ topicsOpen, menuOpen }) => (topicsOpen ? 8 : 10)};
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
    /* ${({ home }) =>
      home &&
      ` */
    /* `} */
  `}

  .header-subscribe {
    display: none;
    ${media.break`
      position: absolute;
      right: 0;
      top: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 2rem;
      button {
        margin-bottom: 0;
        width: 100%;
      }
    `}
  }
`;

export default Header;
