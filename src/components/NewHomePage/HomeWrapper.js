import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faAngleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import theme, { media } from '../theme';
import GlobalStyle from '../GlobalStyle';
import { SiteContextProvider } from '../SiteContext';
import { useWindowSize } from '../utils';
import Header from '../Header/Header';
import Head from '../Head';
import MobileFooter from '../MobileFooter';

const HomeWrapper = () => {
  return <div></div>;
};

export default HomeWrapper;
