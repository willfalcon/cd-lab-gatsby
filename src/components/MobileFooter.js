import React from 'react';
import styled from 'styled-components';

import SocialList from './SocialList';

const MobileFooter = () => {
  return (
    <StyledMobileFooter>
      <SocialList />
    </StyledMobileFooter>
  );
};

const StyledMobileFooter = styled.div`
  width: 100%;
  /* height: 50px; */
  .social-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: ${({ theme }) => theme.orange};
    padding-top: 0;
    padding-bottom: 0;
    li {
      padding-top: 1rem;
      padding-bottom: 1rem;
      &:not(.contact-link) a {
        font-size: initial;
      }
    }
    svg {
      color: ${({ theme }) => theme.offWhite};
    }
  }
`;

export default MobileFooter;
