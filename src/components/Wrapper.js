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
import { useWindowSize } from './utils';

import Header from './Header/Header';
import Head from './Head';
import MobileFooter from './MobileFooter';

library.add(fab, faArrowRight, faAngleRight, faAngleDoubleLeft);

const Wrapper = ({ children, seo, pageTitle, home = false }) => {
  const viewport = useWindowSize();
  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider home={home}>
        <Head {...seo} pageTitle={pageTitle} home={home} />
        <Header />
        <PageWrapper className="page-wrapper" viewport={viewport} home={home}>
          {children}
        </PageWrapper>
        {viewport.width < theme.sizes.break && <MobileFooter />}
        <GlobalStyle />
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const PageWrapper = styled.div`
  min-height: ${({ viewport }) =>
    viewport.width ? `${viewport.height - 65 - 42}px` : `calc(100vh - 107px)`};
  ${media.break`
    min-height: ${({ viewport }) =>
      viewport.height ? `${viewport.height}px` : `100vh`};
    ${({ home, viewport }) =>
      home &&
      `
      // height: ${viewport.height ? `${viewport.height}px` : `100vh`};
    `}
    main {
      padding-left:90px;
      min-height: ${({ viewport }) =>
        viewport.height ? `${viewport.height}px` : `100vh`};
    }
    .container {
      min-height: ${({ viewport }) =>
        viewport.height ? `${viewport.height}px` : `100vh`};
    }
  `}
`;

export default Wrapper;
