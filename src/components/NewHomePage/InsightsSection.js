import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import BlockTitle from './BlockTitle';
import Content from '../Content';
import Button from '../Button';
import NewsletterButton from '../NewsletterButton';
import WebinarButton from '../WebinarButton';

const InsightsSection = () => {
  const props = useStaticQuery(graphql`
    {
      sanityHomePage {
        _rawInsightsSection(resolveReferences: { maxDepth: 10 })
      }
    }
  `);
  console.log(props);
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
        webinarForm,
      },
    },
  } = props;
  return (
    <Insights className="insights">
      <BlockTitle className="insights__heading">{heading}</BlockTitle>
      <Content className="insights__copy">{copy}</Content>
      <Columns className="insights__columns">
        <Insight className="insight">
          <h4 className="insight__heading">{articlesHeading}</h4>
          <Content className="insight__content">{articlesContent}</Content>
          <Button href="/blog" className="insight__button">
            Read Articles
          </Button>
        </Insight>
        <Insight className="insight">
          <h4 className="insight__heading">{newsletterHeading}</h4>
          <Content className="insight__content">{newsletterContent}</Content>
          <NewsletterButton className="insight__button">
            Join the List
          </NewsletterButton>
        </Insight>
        <Insight className="insight">
          <h4 className="insight__heading">{webinarHeading}</h4>
          <Content className="insight__content">{webinarContent}</Content>
          <WebinarButton className="insight__button">
            Sign up FREE
          </WebinarButton>
        </Insight>
      </Columns>
    </Insights>
  );
};
const Insight = styled.div`
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
const Columns = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const Insights = styled.section`
  padding: 1rem 0 4rem;
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
