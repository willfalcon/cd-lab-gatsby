import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';

import ServiceListItem from './ServiceListItem';

import theme, { media } from '../theme';
import useSiteContext from '../SiteContext';
import { roundToDecimal } from '../utils';

const ServiceList = ({ projects, titleRef, services }) => {
  // let services = [];
  // if (projects && projects.length > 0) {
  //   projects.forEach(project => {
  //     if (project.categories) {
  //       project.categories.forEach(cat => {
  //         services.push(cat);
  //       });
  //     }
  //   });
  // }

  const [titleHeight, setTitleHeight] = useState(0);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
  }, []);

  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;

  const right = roundToDecimal(
    // (viewport.width - 100) * 0.6 - (viewport.width - 100) * 0.4 * 0.1,
    -(viewport.width - 100) * 0.4 * 0.1 - 10,
    2
  );
  const width = roundToDecimal(((viewport.width - 100) * 0.4) / 2, 2);

  const baseTop = viewport.height * 0.05 + 120;

  return (
    <StyledServiceList
      className="service-list"
      style={
        mobile
          ? {}
          : {
              right: `${right}px`,
              width: `${width}px`,
              top: titleHeight > 91 ? `${baseTop + titleHeight - 91}px` : `${baseTop}px`,
            }
      }
    >
      {uniqWith(services, isEqual).map(service => {
        return <ServiceListItem key={service.id} {...service} />;
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
  margin: 3rem 3rem 3rem;
  position: relative;
  z-index: 1;
  a,
  span {
    text-decoration: none;
    color: ${({ theme }) => theme.offWhite};
  }
  li {
    text-align: left;
    display: block;
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.font.heading};
    letter-spacing: 1.5px;
    font-weight: 700;
    padding: 1rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.offWhite};
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      border-bottom: 0px;
    }
    .caret {
      margin-right: 0;
    }
  }
  ${media.break`
    order: 3;
    margin: 0;
    /* width: ${({ width }) => width}px; */
    /* position: fixed; */
    position: absolute;
    /* right: ${({ right }) => right}px; */
    top: 16rem;
    top: calc(12rem + 5%);
    li {
      text-align: left;
    }
  `}
`;

export default ServiceList;
