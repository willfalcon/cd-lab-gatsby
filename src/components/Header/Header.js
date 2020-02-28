import React from 'react';
import styled from 'styled-components';

import MenuToggle from './MenuToggle';
import SocialList from '../SocialList';
import Nav from './Nav';
import useSiteContext from '../SiteContext';
import { media } from '../theme';

import SiteLogo from './SiteLogo';

const Header = () => {
  const { menuOpen, home, expandedTopic } = useSiteContext();
  return (
    <StyledHeader
      topicsOpen={expandedTopic}
      menuOpen={menuOpen}
      className="header"
    >
      <SiteLogo home={home} />
      <MenuToggle />
      <SocialList />
      <Nav />
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
    z-index: ${({ topicsOpen, menuOpen }) => (topicsOpen ? 8 : 12)};
  `}
`;

export default Header;
