import React from 'react';
import { useTransition } from 'react-spring';

import Topic from './Topic';
import BackgroundOverlay from '../BackgroundOverlay';
import ExpandedTopic from './ExpandedTopic';
import TopicsHeading from './TopicsHeading';

import theme from '../theme';
import useSiteContext from '../SiteContext';

const Topics = ({ home = false }) => {
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

  console.log({ expandedIndex });
  return (
    <>
      {ready && home && <TopicsHeading viewport={viewport} />}
      {topics.map(({ node }, index) => (
        <Topic
          key={node.id}
          {...node}
          setExpandedTopic={setExpandedTopic}
          home={home}
          expanded={node.id === expandedTopic}
          expandedIndex={expandedIndex}
          topicIndex={index}
        />
      ))}
      {expandedTopicTransition.map(({ item, key, props }) => {
        return (
          item && (
            <React.Fragment key={key}>
              {!mobile && (
                <BackgroundOverlay
                  style={props}
                  onClick={() => setExpandedTopic(null)}
                />
              )}
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

export default Topics;
