import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import Heading from '../Heading';
import Content from '../Content';
import CloseButton from '../CloseButton';

import { media } from '../theme';

const ExpandedPerson = ({
  size,
  styles,
  viewport,
  position,
  name,
  _rawBio,
  handleExpand,
}) => {
  return (
    <StyledExpandedPerson
      className="expanded-person"
      style={styles}
      size={size}
      viewport={viewport}
    >
      <div className="person-info">
        <h4 className="position">{position}</h4>
        <Heading h2 className="name">
          {name}
        </Heading>
        <Content>{_rawBio}</Content>
      </div>
      <CloseButton handleClick={() => handleExpand(null)} />
    </StyledExpandedPerson>
  );
};

const StyledExpandedPerson = styled(animated.div)`
  overflow: hidden;
  background: ${({ theme }) => theme.dark};
  z-index: 1;
  position: absolute;
  padding-top: ${({ viewport }) => viewport.width * 0.75 + 20}px;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  ${media.break`
    padding-top: 2rem;
    background: ${({ theme }) => theme.offWhite};
    .block-content, * {
      color: ${({ theme }) => theme.dark};
    }
    .person-info {
      width: 55%;
    }
  `}
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
    margin-bottom: 0.5rem;
    ${media.break`
      color: ${({ theme }) => theme.dark};
    `}
  }
  .name {
    font-size: 2.4rem;
    line-height: 1.3;
    color: ${({ theme }) => theme.offWhite};
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.font.bold};
    font-family: ${({ theme }) => theme.font.heading};
    letter-spacing: 3px;
    ${media.break`
      color: ${({ theme }) => theme.orange};
    `}

    ::after {
      content: '';
      display: block;
      width: 50px;
      height: 5px;
      background: ${({ theme }) => theme.orange};
      margin-top: 1rem;
    }
  }
`;

export default ExpandedPerson;
