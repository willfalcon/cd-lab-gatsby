import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Link } from 'gatsby';

const CatList = ({ categories }) => {
  const deactivated = categories.filter(cat => cat.deactivated);
  const active = categories.filter(cat => !cat.deactivated);
  console.log({deactivated,active})

  return (
    <StyledCatList className="cats">
      {active.map(({ service: {_id, title, slug} }) => (
        <StyledCategory key={_id} className="link">
          <Link to={`/service/${slug.current}`}>{title}</Link>
        </StyledCategory>
      ))}
      {deactivated.map(({ service: {_id, title} }) => (
        <StyledCategory key={_id} className="no-link">
          <span>{title}</span>
        </StyledCategory>
      ))}
    </StyledCatList>
  );
};

const StyledCategory = styled.li`
  font-size: 1.6rem;
  font-family: synthese, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.offWhite};
  text-align: center;
  padding: 0.5rem 0;
  &.link::after {
    content: '';
    width: 0;
    transition: 0.15s;
    height: 2px;
    background: ${({ theme }) => theme.orange};
    display: block;
  }
  &.link:hover {
    &::after {
      width: 100px;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
  a {
    color: ${({ theme }) => theme.offWhite};
    text-decoration: none;
  }
  span {
    color: ${({ theme }) => rgba(theme.offWhite, 0.8)};
  }
`;

const StyledCatList = styled.ul`
  background: ${({ theme }) => theme.orange};
  list-style: none;
  padding: 1rem;
  margin: 0;
  grid-area: list;
`;

export default CatList;
