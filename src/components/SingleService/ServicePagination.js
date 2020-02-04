import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Caret from '../Caret';

const ServicePagination = ({ prev, next }) => {
  return (
    <StyledPagination className="pagination">
      <PaginationLink
        className="pagination-link"
        to={`/service/${prev.slug.current}`}
      >
        <span className="direction previous">
          <Caret left /> Previous
        </span>
        <span className="service-title previous">{prev.title}</span>
      </PaginationLink>
      <PaginationLink
        className="pagination-link right"
        to={`/service/${next.slug.current}`}
        right
      >
        <span className="direction next">
          Next <Caret />
        </span>
        <span className="service-title next">{next.title}</span>
      </PaginationLink>
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 2rem 0;
  align-self: flex-end;
  width: 100%;
`;

const PaginationLink = styled(Link)`
  flex: 0 0 50%;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
  cursor: pointer;
  display: block;
  text-decoration: none;
  span {
    color: ${({ theme }) => theme.orange};
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: ${({ theme }) => theme.boldWeight};
    display: block;
    line-height: 1.2;
    &.direction {
      letter-spacing: 2px;
      text-transform: uppercase;
      display: flex;
      justify-content: ${({ right }) => (right ? 'flex-end' : 'flex-start')};
    }
  }
  .caret {
  }
`;

export default ServicePagination;
