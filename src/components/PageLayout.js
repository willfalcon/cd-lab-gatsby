import styled from 'styled-components';

import { media, grid } from './theme';

const PageLayout = styled.div.attrs(() => ({
  className: 'page-layout',
}))`
  .main {
    padding: 2rem 0;
    .heading {
      line-height: 1.1;
      padding: 0 3rem;
    }
  }

  .content {
    padding: 0 3rem;
    margin: 2rem 0;
  }

  ${media.break`
    display: ${({ mobile }) => (mobile ? 'block' : 'flex')};
    padding-left: 10rem;
    height: 100vh;

    .main {
      padding: 0;
      padding-right: 2rem;
      display: flex;
      flex-flow: column;
      flex: 0 0 40%;
      ${({ collection }) =>
        collection &&
        `
        position: relative;
      `}

      .heading {
        padding: 0;
        margin-top: 4rem;
        width: 75%;
        &::after {
          margin-top: 1rem;
          height: 3px;
        }
      }
      .content {
        padding: 0; 
        ${({ collection = false }) =>
          collection &&
          `
          padding-right: 5%;
        `}
        width: ${({ collection = false }) => (collection ? 65 : 100)}%;
        overflow: scroll;

        ${media.break`
          ${grid.enabled`
            flex-grow: 1;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr;
            justify-items: start;
          `}
        `}
      }
    }
 `}
`;

export default PageLayout;