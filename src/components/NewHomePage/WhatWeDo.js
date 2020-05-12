import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Content from '../Content';
import BlockTitle from './BlockTitle';
import HomeTopics from './HomeTopics';

const WhatWeDo = () => {
  const {
    sanityHomePage: { _rawWhatWeDoCopy },
  } = useStaticQuery(graphql`
    {
      sanityHomePage {
        _rawWhatWeDoCopy(resolveReferences: { maxDepth: 10 })
      }
    }
  `);
  return (
    <StyledSection className="what-we-do">
      <BlockTitle className="what-we-do__title">What We Do</BlockTitle>
      <Content className="what-we-do__copy">{_rawWhatWeDoCopy}</Content>
      <HomeTopics />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: ${({ theme }) => theme.light};
  padding: 1rem 1rem 4rem;
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
