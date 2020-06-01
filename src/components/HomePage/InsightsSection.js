import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { useSpring, useTrail } from 'react-spring';

import BlockTitle from '../BlockTitle';
import Content from '../Content';
import Button from '../Button';
import NewsletterButton from '../NewsletterButton';
import WebinarButton from '../WebinarButton';
import Insight from './Insight';

import { media, grid } from '../theme';
import { useOnScreen } from '../utils';

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

  const titleRef = useRef();

  const { hasEnteredScreen } = useOnScreen(titleRef, '-100px');

  const titleSpring = useSpring({
    transform: hasEnteredScreen ? 'translateY(0%)' : 'translateY(100%)',
    opacity: hasEnteredScreen ? 1 : 0,
  });

  const insights = [
    {
      heading: articlesHeading,
      content: articlesContent,
      button: () => (
        <Button href="/blog" className="insight__button">
          Read Articles
        </Button>
      ),
    },
    {
      heading: newsletterHeading,
      content: newsletterContent,
      button: () => (
        <WebinarButton className="insight__button">Sign up FREE</WebinarButton>
      ),
    },
    {
      heading: webinarHeading,
      content: webinarContent,
      button: () => (
        <NewsletterButton className="insight__button">
          Join the List
        </NewsletterButton>
      ),
    },
  ];

  const insightTrail = useTrail(insights.length, {
    opacity: hasEnteredScreen ? 1 : 0,
  });

  return (
    <Insights className="insights">
      <BlockTitle
        className="insights__heading"
        ref={titleRef}
        styles={titleSpring}
      >
        {heading}
      </BlockTitle>
      <Content className="insights__copy">{copy}</Content>
      <Columns className="insights__columns">
        {insightTrail.map((props, index) => {
          const insight = insights[index];

          return <Insight {...insight} key={index} styles={props} />;
        })}
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
