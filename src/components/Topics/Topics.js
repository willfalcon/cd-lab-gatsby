import React, { useState, useEffect } from 'react';
import { useTransition } from 'react-spring';

import Topic from './Topic';
import BackgroundOverlay from '../BackgroundOverlay';
import ExpandedTopic from './ExpandedTopic';
import TopicsHeading from './TopicsHeading';

import theme from '../theme';
import useSiteContext from '../SiteContext';

const Topics = ({ home = false, error = false }) => {
  const { viewport, ready, topics, setExpandedTopic, expandedTopic, topicToggledFromMenu } = useSiteContext();

  const mobile = viewport.width < theme.sizes.break;

  const expandedTopicTransition = useTransition(expandedTopic, {
    from: {
      opacity: 0,
      position: 'absolute',
      zIndex: mobile ? 1 : 8,
    },
    enter: {
      opacity: 1,
      position: mobile && !topicToggledFromMenu ? 'relative' : 'absolute',
    },
    leave: {
      opacity: 0,
      zIndex: mobile ? 0 : 4,
      position: mobile && !topicToggledFromMenu ? 'relative' : 'absolute',
    },
  });

  const expandedIndex = topics.findIndex(topic => topic.node.id === expandedTopic);

  const [topicsOpen, setTopicsOpen] = useState(home || error);
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    if (topicToggledFromMenu && mobile) {
      setScrollY(window.scrollY);
    }
    setTopicsOpen(home || error || expandedTopic ? true : false);
  }, [expandedTopic, mobile, home, error, topicToggledFromMenu]);

  const allTopicTransition = useTransition(topicsOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return allTopicTransition(
    (allProps, item) =>
      item && (
        <React.Fragment>
          {ready && (home || error) && <TopicsHeading viewport={viewport} error={error} />}
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
              toggledFromMenu={topicToggledFromMenu}
              scrollY={scrollY}
            />
          ))}
          {expandedTopicTransition((props, item) => {
            return (
              item && (
                <React.Fragment key={item.id}>
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
                    toggledFromMenu={topicToggledFromMenu}
                    scrollY={scrollY}
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
