import styled from 'styled-components';
import { animated } from 'react-spring';

import { media, grid } from '../theme';

const StyledPerson = styled(animated.li)`
  /* flex: 0 0 50%;
  max-width: 50%; */
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  z-index: ${({ expanded }) => (expanded ? 4 : 0)};
  line-height: 1;
  display: block;
  /* background: ${({ expanded, theme }) =>
    expanded ? theme.dark : 'transparent'}; */
  /* transition: all 0.25s;
  padding: ${({ expanded }) => (expanded ? '1rem 1.5rem' : '0')}; */
  .person-image {
    width: 100%;
    height: 100%;
  }
  ${media.break`
    flex: ${({ primary }) => (primary ? '0 0 45%' : '0 0 33.333333%')};
    max-width: ${({ primary }) => (primary ? '45%' : '33.333333%')};
    position: ${({ expanded }) => (expanded ? 'absolute' : 'relative')};
    position: relative;
    padding: 0;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.offWhite};
    z-index: ${({ expanded }) => expanded && `10 !important`};
    /* z-index: 1; */


    ${grid.enabled`
      width: 100%;
      height: 100%;
      max-width: 100%;
      grid-row-end: span 3;
      grid-column-end: span 3;
      &.normal {
        &-1 {
          grid-area: person1;
        }
        &-2 {
          grid-area: person2;
        }
        &-3 {
          grid-area: person3;
        }
        &-4 {
          grid-area: person4;
        }
        &-5 {
          grid-area: person5;
        }
        &-6 {
          grid-area: person6;
        }
        &-7 {
          grid-area: person7;
        }
        &-8 {
          grid-area: person8;
        }
      }
      ${({ pos }) =>
        pos &&
        `
          position: absolute;
          top: ${pos.top}px;
          left: ${pos.left}px;
          width: ${pos.width}px;
          height: ${pos.height}px;
        `}
      `}
    `}

  

  ${media.large`

    ${grid.enabled`
      grid-row-end: span 2;
      grid-column-end: span 2;
    `}


    ${({ pos }) =>
      pos &&
      `
      position: absolute;
      top: ${pos.top}px;
      left: ${pos.left}px;
      width: ${pos.width}px;
      height: ${pos.height}px;
    `}

  `}




  .gatsby-image-wrapper {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    display: block !important;
    /* width: 100% !important;
    height: 100% !important; */
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

`;

export default StyledPerson;
