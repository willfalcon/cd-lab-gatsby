import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import BlockTitle from '../BlockTitle';
import Content from '../Content';
import Button from '../Button';
import NewsletterButton from '../NewsletterButton';
import WebinarButton from '../WebinarButton';
import Insight from './Insight';

import { media, grid } from '../theme';

const InsightsSection = () => {
  const props = useStaticQuery(graphql`
    {
      sanityHomePage {
        _rawInsightsSection(resolveReferences: { maxDepth: 10 })
      }
    }
  `);
  const {
    sanityHomePage: {
      _rawInsightsSection: {
        heading,
        copy,
        articlesHeading,
        articlesContent,
        newsletterHeading,
        newsletterContent,
        webinarHeading,
        webinarContent,
      },
    },
  } = props;
  const blogButton = () => (
    <Button href="/blog" className="insight__button">
      Read Articles
    </Button>
  );
  const newsletterButton = () => (
    <NewsletterButton className="insight__button">
      Join the List
    </NewsletterButton>
  );
  const webinarButton = () => (
    <WebinarButton className="insight__button">Sign up FREE</WebinarButton>
  );
  return (
    <Insights className="insights">
      <BlockTitle className="insights__heading">{heading}</BlockTitle>
      <Content className="insights__copy">{copy}</Content>
      <Columns className="insights__columns">
        <Insight
          heading={articlesHeading}
          content={articlesContent}
          button={blogButton}
        />
        <Insight
          heading={newsletterHeading}
          content={newsletterContent}
          button={newsletterButton}
        />
        <Insight
          heading={webinarHeading}
          content={webinarContent}
          button={webinarButton}
        />
      </Columns>
    </Insights>
  );
};

const Columns = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const Insights = styled.section`
  padding: 1rem 0 4rem;
  ${media.break`
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${grid.enabled`
      display: grid;
      grid-template-rows: repeat(3, auto);
      align-content: center;
      grid-row-gap: 4rem;
    `}
  `}
  .insights {
    &__heading {
    }
    &__copy {
      width: ${({ theme }) => theme.sizes.content}px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      padding: 1rem 0;
      * {
        font-family: ${({ theme }) => theme.font.heading};
        color: black;
        font-size: 2.6rem;
        line-height: 1.2;
      }
    }
  }
`;
export default InsightsSection;
