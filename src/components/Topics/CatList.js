import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Link } from 'gatsby';
import classNames from 'classnames';

import Caret from '../Caret';

import theme from '../theme';

const CatListItem = ({ className, service, inactive = false }) => {
  
  const [hover, setHover] = useState(false);
  const { _id, title, slug } = service;
  return (
    <StyledCategory key={_id} className={classNames('cats-list-item', className)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {inactive ? (
        <span>{title}</span>
      ) : (
        <Link to={`/service/${slug.current}`}>{title}</Link>
      )}
      {!inactive && <Caret color={theme.offWhite} hover={hover} />}
    </StyledCategory>
  )
}

const CatList = ({ categories }) => {
  const deactivated = categories.filter(cat => cat.deactivated);
  const active = categories.filter(cat => !cat.deactivated);
  
  return (
    <StyledCatList className="cats">
      {active.map(({ service }) => (
        <CatListItem key={service._id} className="link" service={service} />
      ))}
      {deactivated.map(({ service }) => (
        <CatListItem key={service._id} className="no-link" service={service} inactive />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* &.link::after {
    content: '';
    width: 0;
    transition: 0.15s;
    height: 2px;
    background: ${({ theme }) => theme.orange};
    display: block;
  } */
  /* &.link:hover {
    &::after {
      width: 100px;
    }
  } */
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
