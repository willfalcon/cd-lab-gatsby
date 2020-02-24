import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import ExpandButton from '../ExpandButton';

import { media } from '../theme';
import useSiteContext from '../SiteContext';

const AboutLink = ({ image, makeReady }) => {
  const { viewport } = useSiteContext();
  return (
    <StyledAboutLink className="about-link" to="/about" viewport={viewport}>
      <AboutLinkImage
        className="about-link__image"
        fluid={image.asset.fluid}
        objectFit="cover"
      />
      <ExpandButton label="Go to About page" />
      <AboutLinkHeading>About Us</AboutLinkHeading>
    </StyledAboutLink>
  );
};

const AboutLinkImage = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
`;

const AboutLinkHeading = styled.h3`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledAboutLink = styled(Link)`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vw;
  text-decoration: none;
  cursor: pointer;
  h3 {
    color: white;
    z-index: 1;
    font-size: 1.8rem;
  }
  ${media.break`
    flex: 0 0 33.333%;
    /* max-height: 33.333%; */
    height: ${({ viewport }) => viewport.height / 3}px;
    max-height: ${({ viewport }) => viewport.height / 3}px;
  `}
`;

export default AboutLink;
