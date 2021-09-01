import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { useTransition, animated } from 'react-spring';

import ServiceListItem from '../Collection/ServiceListItem';

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

  const transition = useTransition(services, item => item.id, {
    from: { opacity: 0, transform: 'scaleY(0)', transformOrigin: 'top' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, position: 'absolute', transform: 'scaleY(0)' },
    delay: 200,
  });

  return (
    <StyledServiceList
      className="service-list"
      style={
        mobile
          ? {}
          : {
              // right: `50%`,
              left: 100 + (viewport.width - 100) / 2,
              transform: `translateX(-${width / 2 + 70}px)`,
              width: `${width}px`,
              // top: titleHeight > 91 ? `${baseTop + titleHeight - 91}px` : `${baseTop}px`,
              top: `${titleHeight + 78 + 30}px`,
            }
      }
    >
      {transition.map(({ item, key, props }) => {
        return <ServiceListItem key={key} styles={props} {...item} />;
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
  z-index: 2;
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
