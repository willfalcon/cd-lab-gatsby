import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import Content from '../Content';

const Insight = ({ heading, content, button, styles }) => {
  return (
    <StyledInsight className="insight" style={styles}>
      <h4 className="insight__heading">{heading}</h4>
      <Content className="insight__content">{content}</Content>
      {button()}
    </StyledInsight>
  );
};

const StyledInsight = styled(animated.div)`
  flex: 0 1 350px;
  padding: 0 1rem;
  font-family: ${({ theme }) => theme.font.heading};
  color: black;
  line-height: 1.2;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  .button {
    margin: 0;
    align-self: center;
    margin-top: 1rem;
    button {
      margin: 0;
    }
  }
  .insight {
    &__heading {
      color: ${({ theme }) => theme.orange};
      font-family: ${({ theme }) => theme.font.heading};
      text-transform: none;
      letter-spacing: 1px;
      font-weight: ${({ theme }) => theme.font.black};
      font-size: 4.8rem;
      margin: 0;
      margin-bottom: 1rem;
    }
    &__content {
      flex-grow: 1;
      * {
        font-size: 2.4rem;
      }
    }
  }
`;

export default Insight;
