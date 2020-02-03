import styled from 'styled-components';

import { media } from '../theme';

const StyledPerson = styled.li`
  /* flex: ${({ expanded }) => (expanded ? '0 0 100%' : '0 0 50%')}; */
  flex: 0 0 50%;
  /* max-width: ${({ expanded }) => (expanded ? '100%' : '50%')}; */
  max-width: 50%;
  position: relative;
  /* position: ${({ expanded }) => (expanded ? 'absolute' : 'relative')}; */
  left: 0;
  /* z-index: ${({ expanded }) => (expanded ? 10 : 'initial')}; */
  line-height: 1;
  display: block;
  background: ${({ expanded, theme }) =>
    expanded ? theme.dark : 'transparent'};
  transition: all 0.25s;
  /* order: ${({ expanded, index }) => (expanded ? 1 : index + 2)}; */
  padding: ${({ expanded }) => (expanded ? '1rem 1.5rem' : '0')};
  height: ${({ personHeight }) => personHeight}px;
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
    /* left: ${({ expanded }) => (expanded ? '50%' : 'initial')}; */
    /* top: ${({ expanded }) => (expanded ? '50%' : 'initial')}; */
    /* transform: ${({ expanded }) =>
      expanded ? 'translateY(-50%) translateX(-50%)' : 'initial'}; */
    background: ${({ theme }) => theme.offWhite};
    z-index: ${({ expanded }) => (expanded ? 5 : 1)};
    /* ${({ expanded }) =>
      expanded &&
      `
      flex: 0 0 75vw;
      max-width: 75vw;
      z-index: 10;
    `} */

    /* ${({ expanded, theme }) =>
      expanded &&
      theme.grid &&
      `
      display: grid;
      grid-template-columns: 1fr 450px;
      grid-template-rows: auto;
      width: 75%;
      .image-wrap-button {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        img {
          width: 100%;
          max-width: 100%;
        }
      }
      .expanded-person {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
    `} */

    ${({ theme }) =>
      theme.grid &&
      `
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
    `}
  `}

  ${media.large`
    ${({ theme }) =>
      theme.grid &&
      `
      grid-row-end: span 2;
      grid-column-end: span 2;
    `}
  `}

  /* img {
    width: ${({ expanded }) => (expanded ? '75%' : '100%')};
    max-width: ${({ expanded }) => (expanded ? '200px' : '100%')};
    display: block;
    margin: 0 auto;
  } */

  .image-wrap-button {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    cursor: pointer;
      height: 100%;
    ${media.break`
    `}
    &:focus {
      outline: none;
    }
  }

  .expanded-person {
    transition: 0.25s;
    max-height: ${({ expanded }) => (expanded ? '1000px' : '0px')};
    overflow: hidden;
    .block-content,
    * {
      color: ${({ theme }) => theme.offWhite};
      line-height: 2;
      ${media.break`
        color: ${({ theme }) => theme.dark};
      `}
    }
    .position {
      color: ${({ theme }) => theme.orange};
      line-height: 1.3;
      ${media.break`
        color: ${({ theme }) => theme.dark};
      `}
    }
    .name {
      font-size: 2.4rem;
      line-height: 1.3;
      color: ${({ theme }) => theme.offWhite};
      margin-bottom: 1rem;
      ${media.break`
        color: ${({ theme }) => theme.orange};
      `}

      &::after {
        content: '';
        display: block;
        width: 75px;
        height: 5px;
        background: ${({ theme }) => theme.orange};
        margin-top: 1.6rem;
      }
    }
  }
`;

export { StyledPerson };
