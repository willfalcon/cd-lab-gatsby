import { createGlobalStyle, css } from 'styled-components';

const imgStyle = css`
  display: block;
  max-width: 100%;
  height: auto;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  :focus {
    outline-color: ${({ theme }) => theme.lightOrange};
  }
  body {
    padding: 0;
    margin: 0;
    font-family: granville, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.6rem;
    line-height: 2;
    background-color: ${({ theme }) => theme.offWhite};
    color: ${({ theme }) => theme.dark};
/*     
    @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.dark};
      color: ${({ theme }) => theme.offWhite};
    } */
  }
  img {
    ${imgStyle}
  }
  h2 {
    font-family: granville, serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1.25;
    margin: 0;
    font-size: 2.8rem;
  }
  h3, label, input, textarea {
    font-family: synthese, sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    line-height: 2.15;
    margin: 0 0 .5rem;
    font-size: 1.4rem;
    text-transform: uppercase;
  }
  h4 {
    font-family: synthese, sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  label {
    color: ${({ theme }) => theme.dark};
  }
  p {
    margin: 0 0 1rem;
    font-family: granville, serif;
    font-size: 1.6rem;
  }
  .text-center {
    text-align: center;
  }
  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }
  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeout}ms;
  }
`;

export { imgStyle };
export default GlobalStyle;
