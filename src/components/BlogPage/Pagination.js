import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Link } from 'gatsby';

import Caret from '../Caret';

import { media } from '../theme';

const Pagination = ({ numPages, currentPage }) => {
  const slug = 'blog';

  const prev = currentPage > 1 ? currentPage - 1 : false;
  const next = currentPage === numPages ? false : currentPage + 1;

  const twoBack = currentPage > 2 ? currentPage - 2 : false;
  const twoAhead = numPages - currentPage > 1 ? currentPage + 2 : false;
  const threeBack = currentPage > 3 ? currentPage - 3 : false;
  const threeAhead = numPages - currentPage > 2 ? currentPage + 3 : false;

  return (
    <StyledPagination role="navigation" aria-label="Pagination Navigation">
      {prev && (
        <Link
          className="page-number prev"
          to={`/${slug}/${prev === 1 ? '' : prev}`}
          aria-label="Go to previous page"
        >
          <Caret className="pagination-caret" left />
        </Link>
      )}
      {threeBack && (
        <Link
          className="page-number"
          to={`/${slug}/${threeBack === 1 ? '' : threeBack}`}
          aria-label={`Go to page ${threeBack}`}
        >
          {threeBack}
        </Link>
      )}
      {twoBack && (
        <Link
          className="page-number"
          to={`/${slug}/${twoBack === 1 ? '' : twoBack}`}
          aria-label={`Go to page ${twoBack}`}
        >
          {twoBack}
        </Link>
      )}
      {prev && (
        <Link
          className="page-number"
          to={`/${slug}/${prev === 1 ? '' : prev}`}
          aria-label={`Go to page ${prev}`}
        >
          {prev}
        </Link>
      )}
      {numPages && <span className="page-number current">{currentPage}</span>}
      {next && (
        <Link
          className="page-number"
          to={`/${slug}/${next === 1 ? '' : next}`}
          aria-label={`Go to page ${next}`}
        >
          {next}
        </Link>
      )}
      {twoAhead && (
        <Link
          className="page-number"
          to={`/${slug}/${twoAhead === 1 ? '' : twoAhead}`}
          aria-label={`Go to page ${twoAhead}`}
        >
          {twoAhead}
        </Link>
      )}
      {threeAhead && (
        <Link
          className="page-number"
          to={`/${slug}/${threeAhead === 1 ? '' : threeAhead}`}
          aria-label={`Go to page ${threeAhead}`}
        >
          {threeAhead}
        </Link>
      )}
      {next && (
        <Link
          className="page-number next"
          to={`/${slug}/${next === 1 ? '' : next}`}
          aria-label="Go to next page"
        >
          <Caret className="pagination-caret" />
        </Link>
      )}
    </StyledPagination>
  );
};

const StyledPagination = styled.nav`
  margin: 0 auto 2rem;
  background: ${({ theme }) => theme.orange};
  padding: 0.75rem;
  display: inline-flex;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  .page-number {
    color: ${({ theme }) => theme.offWhite};
    border-right: 1px solid ${({ theme }) => theme.offWhite};
    padding: 0.25rem 0.5rem;
    display: block;
    line-height: 1;
    font-size: 1.8rem;
    text-decoration: none;
    &:last-child {
      border-right: 0;
    }
    &.current {
      color: ${({ theme }) => rgba(theme.offWhite, 0.5)};
    }

    &.next,
    &.prev {
      height: 1.8rem;
      width: 2rem;
      position: relative;
      padding: 0;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 2px;
        width: 60%;
        background: ${({ theme }) => theme.offWhite};
        transform-origin: right;
        &:first-child {
          transform: translate(-50%, 0.75px) rotate(45deg);
        }
        &:last-child {
          transform: translate(-50%, -0.75px) rotate(-45deg);
        }
      }
    }

    &.prev {
      span {
        transform-origin: left;
        &:first-child {
          transform: translate(-50%, 0.75px) rotate(-45deg);
        }
        &:last-child {
          transform: translate(-50%, -0.75px) rotate(45deg);
        }
      }
    }
  }

  ${media.break`
    transform: none;
    left: 0;
  `}
`;

export default Pagination;
