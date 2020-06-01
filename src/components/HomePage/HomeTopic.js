import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import Content from '../Content';
import Button from '../Button';

const HomeTopic = ({ index, title, _rawShortContent, collection, styles }) => {
  return (
    <Topic style={styles}>
      <Label>
        <span className="topic__number">{('0' + (index + 1)).slice(-2)}</span>
        <h3 className="topic__title">{title}</h3>
      </Label>
      <Content className="topic__content">{_rawShortContent}</Content>
      <Button
        className="topic__button"
        href={`/collection/${collection.slug.current}`}
      >
        {title} Services
      </Button>
    </Topic>
  );
};

const Topic = styled(animated.div)`
  flex: 0 1 370px;
  padding: 0.5rem 1.5rem;
  .topic__content {
    font-family: ${({ theme }) => theme.font.heading};
    color: black;
    text-align: center;

    * {
      font-size: 2.6rem;
      line-height: 1.2;
    }
  }
  .topic__button {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Label = styled.div`
  position: relative;
  height: 150px;
  span {
    font-size: 15rem;
    letter-spacing: 4.17px;
    color: #ebe4e1;
    line-height: 1;
    position: relative;
    left: 10%;
  }
  h3 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15%;
    font-family: ${({ theme }) => theme.font.heading};
    color: ${({ theme }) => theme.orange};
    font-size: 4.8rem;
    line-height: 1;
    letter-spacing: 1px;
    text-transform: none;
    border: 2px solid #8f8885;
    padding: 1rem 2rem;
    margin: 0;
  }
`;

export default HomeTopic;
