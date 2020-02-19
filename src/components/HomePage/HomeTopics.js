import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { useTransition, animated } from 'react-spring';
import loadable from '@loadable/component';

// import Heading from '../Heading';
// import Content from '../Content';
// import CatList from './CatList';
// import CloseButton from '../CloseButton';
import Topic from '../Topics/Topic';
import BackgroundOverlay from '../BackgroundOverlay';
import ExpandedTopic from '../Topics/ExpandedTopic';

import theme, { media, grid } from '../theme';
import useSiteContext from '../SiteContext';

// const Topic = loadable(() => import('../Topics/Topic'));

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

  const [expandedTopic, setExpandedTopic] = useState(null);

  const { viewport } = useSiteContext();

  const mobile = viewport.width <= theme.sizes.break;

  const expandedTopicTransition = useTransition(expandedTopic, item => item, {
    from: {
      opacity: 0,
      position: 'absolute',
      zIndex: mobile ? 1 : 4,
    },
    enter: {
      opacity: 1,
      position: mobile ? 'relative' : 'absolute',
    },
    leave: {
      opacity: 0,
      zIndex: mobile ? 0 : 4,
      position: mobile ? 'relative' : 'absolute',
    },
  });

  const expandedIndex = topics.indexOf(
    topic => topic.node.id === expandedTopic
  );

  return (
    <>
      {topics.map(({ node }, index) => (
        <Topic
          key={node.id}
          {...node}
          setExpandedTopic={setExpandedTopic}
          home
          expanded={node.id === expandedTopic}
          expandedIndex={expandedIndex}
          topicIndex={index}
        />
      ))}

      {expandedTopicTransition.map(({ item, key, props }) => {
        return (
          item && (
            <React.Fragment key={key}>
              {!mobile && <BackgroundOverlay style={props} />}
              <ExpandedTopic
                topics={topics}
                expandedTopic={expandedTopic}
                style={props}
                setExpandedTopic={setExpandedTopic}
              />
            </React.Fragment>
          )
        );
      })}
    </>
  );
};

// const ExpandedTopic = styled(animated.div)`
//   padding: 3.5rem 2.8rem;
//   background: ${({ theme }) => theme.offWhite};
//   .list-heading {
//     color: ${({ theme }) => theme.orange};
//     text-align: center;
//     font-size: 3.6rem;
//   }
//   ${media.break`
//     width: calc(100% - 150px);
//     max-width: ${({ theme }) => theme.topics.expandedWidth}px;
//     left: 75px;
//     top: 10%;
//     height: 80%;
//     z-index: 5;
//   `}
// `;

export default HomeTopics;
