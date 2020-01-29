import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { useTransition, animated } from 'react-spring';

import Topic from '../Topic';
import Heading from '../Heading';
import Content from '../Content';
import CatList from './CatList';
// import CloseButton from './CloseButton';

const HomeTopics = () => {
  const topicsQueryRes = useStaticQuery(graphql`
    {
      allSanityTopic(sort: { fields: _updatedAt, order: DESC }) {
        edges {
          node {
            id
            title
            _rawContent
            image {
              alt
              asset {
                fixed(width: 175, height: 175) {
                  ...GatsbySanityImageFixed
                }
              }
            }
            slug {
              current
            }
            categories {
              _id
              slug {
                current
              }
              title
            }
          }
        }
      }
    }
  `);

  const topics = topicsQueryRes.allSanityTopic.edges;
  // console.log(topics);

  const [expandedTopic, setExpandedTopic] = useState(null);
  console.log(expandedTopic);
  const expandedTopicTransition = useTransition(expandedTopic, item => item, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return (
    <>
      {topics.map(({ node }) => (
        <Topic key={node.id} {...node} setExpandedTopic={setExpandedTopic} />
      ))}

      {expandedTopicTransition.map(({ item, key, props }) => {
        const topic = item
          ? topics.filter(topic => topic.node.id === expandedTopic)[0]
          : false;
        console.log(topic);
        const { title, _rawContent, categories } = topic.node;
        return (
          topic && (
            <ExpandedTopic key={key} style={props}>
              <Heading h2>{topic.node.title}</Heading>
              <Content>{topic.node._rawContent}</Content>
              {categories && (
                <>
                  <h2 className="list-heading">What We Do</h2>
                  <CatList categories={categories} />
                </>
              )}
            </ExpandedTopic>
          )
        );
      })}
    </>
  );
};

const ExpandedTopic = styled(animated.div)`
  padding: 3.5rem 2.8rem;
  background: ${({ theme }) => theme.offWhite};
`;

export default HomeTopics;
