import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSpring } from 'react-spring';
import useDimensions from 'react-use-dimensions';

import BlockTitle from '../BlockTitle';
import Content from '../Content';
import AboutSectionVideo from './AboutSectionVideo';
import Button from '../Button';

import { media, grid } from '../theme';
import { useOnScreen } from '../utils';

const AboutSection = ({ copy, thumbnail, video }) => {
  const titleRef = useRef();
  const { hasEnteredScreen } = useOnScreen(titleRef, '-100px');
  const titleSpring = useSpring({
    transform: hasEnteredScreen ? 'translateY(0%)' : 'translateY(100%)',
    opacity: hasEnteredScreen ? 1 : 0,
  });
  const [containerRef, containerSize] = useDimensions();
  const titleHeight = 75; // doesn't change
  const [descriptionRef, descriptionSize] = useDimensions();
  const buttonHeight = 70 + 10;
  const videoTopMargin = 30 + 30;
  const topAndBottomPadding = 20;
  const videoMaxHeight = containerSize.height - topAndBottomPadding - titleHeight - descriptionSize.height - buttonHeight - videoTopMargin;

  return (
    <StyledSection className="about-section" ref={containerRef}>
      <BlockTitle className="about-section__title" white ref={titleRef} styles={titleSpring}>
        About Us
      </BlockTitle>
      <Content className="about-section__copy" ref={descriptionRef}>
        {copy}
      </Content>
      <AboutSectionVideo thumbnail={thumbnail} video={video} maxHeight={videoMaxHeight} />
      <div className="about-section__buttons">
        <Button className="about-section__button" href="/about">
          Our Team
        </Button>
        <Button className="about-section__button" href="/post/manifesto">
          Our Mission
        </Button>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: ${({ theme }) => theme.dark};
  padding: 1rem 1rem 1rem;
  ${media.break`
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${grid.enabled`
      display: grid;
      grid-template-rows: repeat(4, auto);
      grid-template-rows: 75px auto 1fr 80;
      align-content: center;
      grid-row-gap: 1rem;
    `}
  `}
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
