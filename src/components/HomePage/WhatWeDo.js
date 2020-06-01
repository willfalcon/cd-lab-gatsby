import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useSpring } from 'react-spring';

import Content from '../Content';
import BlockTitle from '../BlockTitle';
import HomeTopics from './HomeTopics';

import { media, grid } from '../theme';
import useSiteContext from '../SiteContext';
import { useOnScreen } from '../utils';

const WhatWeDo = () => {
  const { viewport } = useSiteContext();
  const titleRef = useRef();
  const { hasEnteredScreen } = useOnScreen(titleRef, '-100px');

  const {
    sanityHomePage: { _rawWhatWeDoCopy },
  } = useStaticQuery(graphql`
    {
      sanityHomePage {
        _rawWhatWeDoCopy(resolveReferences: { maxDepth: 10 })
      }
    }
  `);

  const titleSpring = useSpring({
    transform: hasEnteredScreen ? 'translateY(0%)' : 'translateY(100%)',
    opacity: hasEnteredScreen ? 1 : 0,
  });

  return (
    <StyledSection className="what-we-do" viewport={viewport}>
      <BlockTitle
        className="what-we-do__title"
        ref={titleRef}
        styles={titleSpring}
      >
        What We Do
      </BlockTitle>
      <Content className="what-we-do__copy">{_rawWhatWeDoCopy}</Content>
      <HomeTopics hasEnteredScreen={hasEnteredScreen} />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: ${({ theme }) => theme.light};
  padding: 1rem 1rem 4rem;
  ${media.break`
    max-width: ${({ viewport }) => viewport.width}px;
    width: ${({ viewport }) => viewport.width}px;
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${grid.enabled`
      display: grid;
      grid-template-rows: repeat(3, auto);
      grid-template-columns: 100%;
      align-content: center;
      grid-row-gap: 3rem;
    `}
  `}
  .what-we-do {
    &__title {
    }
    &__copy {
      text-align: center;
      width: ${({ theme }) => theme.sizes.content}px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      font-family: ${({ theme }) => theme.font.heading};
      color: black;
      p {
        font-size: 2.6rem;
        line-height: 1.2;
      }
    }
  }
`;

export default WhatWeDo;
