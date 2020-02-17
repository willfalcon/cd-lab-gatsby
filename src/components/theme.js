import { css } from 'styled-components';

const theme = {
  orange: '#F5591F',
  lightOrange: '#F5911F',
  offWhite: '#FFF9EF',
  dark: '#4E4D39',
  grey: '#979797',
  break: '768px',
  bigBreak: '1024px',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  fontFamily: 'synthese, sans-serif',
  fontFamilySans: 'granville, serif',
  bookWeight: '300',
  regularWeight: '400',
  boldWeight: '700',
  // grid: true,
  timeout: 400,
  grid: {
    enabled: true,
  },
  sizes: {
    medium: 320,
    plus: 414,
    break: 768,
    large: 1024,
  },
  topics: {
    expandedWidth: 900,
    topicSize: 175,
    selectedTopicSize: 150,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const grid = Object.keys(theme.grid).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @supports (display: grid) {
      ${css(...args)}
    }
  `;
  return theme.grid.enabled ? acc : null;
}, {});

export { media, grid };
export default theme;
