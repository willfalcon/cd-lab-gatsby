import React, { useState, useEffect } from 'react';
import { useTransition } from 'react-spring';

import Topic from './Topic';
import BackgroundOverlay from '../BackgroundOverlay';
import ExpandedTopic from './ExpandedTopic';
import TopicsHeading from './TopicsHeading';

import theme from '../theme';
import useSiteContext from '../SiteContext';

const Topics = ({ home = false, error = false }) => {
  const {
    viewport,
    ready,
    topics,
    setExpandedTopic,
    expandedTopic,
  } = useSiteContext();

  const mobile = viewport.width <= theme.sizes.break;

  const expandedTopicTransition = useTransition(expandedTopic, item => item, {
    from: {
      opacity: 0,
      position: 'absolute',
      zIndex: mobile ? 1 : 8,
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

  const expandedIndex = topics.findIndex(
    topic => topic.node.id === expandedTopic
  );

  const [topicsOpen, setTopicsOpen] = useState(home || error);

  useEffect(() => {
    setTopicsOpen(home || error || expandedTopic ? true : false);
  }, [expandedTopic]);

  const allTopicTransition = useTransition(topicsOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // console.log({ expandedIndex });
  return allTopicTransition.map(
    ({ item, key, props: allProps }) =>
      item && (
        <React.Fragment key={key}>
          {ready && (home || error) && (
            <TopicsHeading viewport={viewport} error={error} />
          )}
          {topics.map(({ node }, index) => (
            <Topic
              key={node.id}
              {...node}
              setExpandedTopic={setExpandedTopic}
              home={home}
              expanded={node.id === expandedTopic}
              expandedIndex={expandedIndex}
              topicIndex={index}
              styles={allProps}
              error={error}
            />
          ))}
          {expandedTopicTransition.map(({ item, key, props }) => {
            return (
              item && (
                <React.Fragment key={key}>
                  {!mobile && (
                    <BackgroundOverlay
                      style={{
                        ...allProps,
                        ...props,
                      }}
                      onClick={() => setExpandedTopic(null)}
                    />
                  )}
                  <ExpandedTopic
                    topics={topics}
                    expandedTopic={expandedTopic}
                    style={{ ...allProps, ...props }}
                    setExpandedTopic={setExpandedTopic}
                  />
                </React.Fragment>
              )
            );
          })}
        </React.Fragment>
      )
  );
};

export default Topics;
