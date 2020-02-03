import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faAngleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import theme, { media } from './theme';
import GlobalStyle from './GlobalStyle';
import { SiteContextProvider } from './SiteContext';
import { getViewport } from './utils';

import Header from './Header/Header';
import Head from './Head';
import MobileFooter from './MobileFooter';

library.add(fab, faArrowRight, faAngleRight, faAngleDoubleLeft);

const Wrapper = ({ children, home = false }) => {
  const viewport = getViewport();
  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider home={home}>
        <Head />
        <Header />
        <PageWrapper className="page-wrapper" viewheight={viewport.height}>
          {children}
        </PageWrapper>
        {viewport.width < theme.sizes.break && <MobileFooter />}
        <GlobalStyle />
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const PageWrapper = styled.div`
  min-height: ${({ viewheight }) =>
    viewheight ? `${viewheight - 65 - 42}px` : `calc(100vh - 107px)`};
  ${media.break`
    min-height: ${({ viewheight }) =>
      viewheight ? `${viewheight}px` : `100vh`};
    main {
      padding-left:90px;
      min-height: ${({ viewheight }) =>
        viewheight ? `${viewheight}px` : `100vh`};
    }
    .container {
      min-height: ${({ viewheight }) =>
        viewheight ? `${viewheight}px` : `100vh`};
    }
  `}
`;

export default Wrapper;
