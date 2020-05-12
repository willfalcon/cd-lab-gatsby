import React from 'react';
import styled from 'styled-components';

import BlockTitle from './BlockTitle';
import Content from '../Content';

const AboutSection = ({ copy, thumbnail, video }) => {
  return (
    <StyledSection className="about-section">
      <BlockTitle className="about-section__title" white>
        About Us
      </BlockTitle>
      <Content className="about-section__copy">{copy}</Content>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: ${({ theme }) => theme.dark};

  .about-section__copy {
    color: white;
    text-align: center;
    width: ${({ theme }) => theme.sizes.content}px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-family: ${({ theme }) => theme.font.heading};
    * {
      font-size: 2.6rem;
      line-height: 1.2;
    }
  }
`;

export default AboutSection;
