import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

import ExpandButton from '../ExpandButton';

import useSiteContext from '../SiteContext';
import { media } from '../theme';

const Person = ({
  id,
  _rawBio,
  name,
  primary = false,
  position,
  image,
  expanded,
  index,
  className,
  handleExpand,
}) => {
  const { viewport } = useSiteContext();

  return (
    <StyledPerson
      className={`person ${
        primary ? `primary-${index + 1}` : `normal-${index + 1}`
      }`}
      personHeight={viewport.width / 2}
      expanded={expanded}
    >
      <Img fixed={image.asset.fixed} alt={name} />
      <ExpandButton handleClick={() => handleExpand(id)} cover />
    </StyledPerson>
  );
};

const StyledPerson = styled.li`
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  left: 0;
  line-height: 1;
  display: block;
  background: ${({ expanded, theme }) =>
    expanded ? theme.dark : 'transparent'};
  transition: all 0.25s;
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
    background: ${({ theme }) => theme.offWhite};
    z-index: ${({ expanded }) => (expanded ? 5 : 1)};

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

  .gatsby-image-wrapper {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    cursor: pointer;
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

export default Person;
