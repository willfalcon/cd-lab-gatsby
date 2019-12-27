import React from 'react';
import styled from 'styled-components';

import useSiteContext from '../SiteContext';
import { media } from '../theme';

import SiteLogo from './SiteLogo';

const Header = () => {
  const { menuOpen, home } = useSiteContext();
  const openTopic = true;
  return (
    <StyledHeader topicsOpen={openTopic} menuOpen={menuOpen} className="header">
      <SiteLogo home={home} />
    </StyledHeader>
  );
};

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
  `}
`;

export default Header;
