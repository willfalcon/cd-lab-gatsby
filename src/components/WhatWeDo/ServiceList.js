import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from 'react-spring';

import ServiceListItem from './ServiceListItem';

import theme, { media } from '../theme';
import useSiteContext from '../SiteContext';
import { roundToDecimal } from '../utils';

function sortServices(a, b) {
  if (a.service.title < b.service.title) {
    return -1;
  } else {
    return 1;
  }
}

const ServiceList = props => {
  const { titleRef, services, backgroundColor } = props;

  const [titleHeight, setTitleHeight] = useState(0);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
  }, []);

  const { viewport } = useSiteContext();
  const mobile = viewport.width < theme.sizes.break;

  const width = roundToDecimal(((viewport.width - 100) * 0.4) / 2, 2);

  const transition = useTransition(services.sort(sortServices), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, position: 'absolute' },
    delay: 200,
  });

  return (
    <StyledServiceList
      className="service-list"
      style={
        mobile
          ? {}
          : {
              left: 100 + (viewport.width - 100) / 2,
              transform: `translateX(-${width / 2 + 70}px)`,
              width: `${width}px`,
              top: `${titleHeight + 78 + 30}px`,
            }
      }
      data={{ backgroundColor }}
    >
      {transition((props, item) => {
        // console.log(item);
        return <ServiceListItem key={item.service._id} styles={props} {...item} />;
      })}
    </StyledServiceList>
  );
};

const StyledServiceList = styled.ul`
  list-style: none;
  padding: 0;
  background: ${({ theme }) => theme.orange};
  background: ${({ data: { backgroundColor } }) => backgroundColor};
  transition: background 0.2s;
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
    position: absolute;
    top: 16rem;
    top: calc(12rem + 5%);
    li {
      text-align: left;
    }
  `}
`;

export default ServiceList;
