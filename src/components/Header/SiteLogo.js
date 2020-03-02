import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { media } from '../theme';
import Square from '../../images/cd-new-square.png';
import Logo from '../../images/cd-logo-h.png';

const SiteLogo = ({ home }) => {
  return (
    <StyledLogoLink to="/" className="site-logo">
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
