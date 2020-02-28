import React from 'react';
import styled from 'styled-components';
import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';
import { Link } from 'gatsby';

import { media } from './theme';

const ServiceList = ({ projects, right, width }) => {
  let services = [];
  if (projects && projects.length > 0) {
    projects.forEach(project => {
      if (project.categories) {
        project.categories.forEach(cat => {
          services.push(cat);
        });
      }
    });
  }

  console.log(services);

  return (
    <StyledServiceList className="service-list" right={right} width={width}>
      {uniqWith(services, isEqual).map(({ title, slug, id }) => {
        return (
          <li key={id} className="service-list__item link">
            <Link to={`/service/${slug.current}`}>{title}</Link>
          </li>
        );
      })}
    </StyledServiceList>
  );
};

const StyledServiceList = styled.ul`
  list-style: none;
  padding: 0;
  background: ${({ theme }) => theme.orange};
  display: block;
  padding: 0 2rem;
  margin: 3rem 3rem -2rem;
  position: relative;
  z-index: 1;
  a,
  span {
    text-decoration: none;
    color: ${({ theme }) => theme.offWhite};
  }
  li {
    text-align: center;
    display: block;
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fontFamily};
    letter-spacing: 3px;
    font-weight: 700;
    padding: 1rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.offWhite};
    font-size: 1.4rem;
    &:last-child {
      border-bottom: 0px;
    }
  }
  ${media.break`
    order: 3;
    margin: 0;
    width: ${({ width }) => width}px;
    position: fixed;
    right: ${({ right }) => right}px;
    top: 16rem;
    top: calc(12rem + 5%);
    li {
      text-align: left;
    }
  `}
`;

export default ServiceList;
