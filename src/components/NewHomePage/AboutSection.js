import React from 'react';
import styled from 'styled-components';

import BlockTitle from './BlockTitle';
import Content from '../Content';
import AboutSectionVideo from './AboutSectionVideo';
import Button from '../Button';

const AboutSection = ({ copy, thumbnail, video }) => {
  return (
    <StyledSection className="about-section">
      <BlockTitle className="about-section__title" white>
        About Us
      </BlockTitle>
      <Content className="about-section__copy">{copy}</Content>
      <AboutSectionVideo thumbnail={thumbnail} video={video} />
      <div className="about-section__buttons">
        <Button className="about-section__button" href="/about">
          Our Team
        </Button>
        <Button className="about-section__button" href="/about">
          Our Mission
        </Button>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: ${({ theme }) => theme.dark};
  padding: 1rem 1rem 1rem;
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
  .about-section__buttons {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 1rem;
    .button {
      margin: 1rem;
    }
  }
`;

export default AboutSection;
