import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { animated } from 'react-spring';

import Heading from '../Heading';
import Content from '../Content';
import CatList from './CatList';
import CloseButton from '../CloseButton';

import { media, grid } from '../theme';
import useSiteContext from '../SiteContext';

const ExpandedTopic = ({
  topics,
  expandedTopic,
  setExpandedTopic,
  style,
  className,
  toggledFromMenu,
  scrollY
}) => {
  const { viewport, setTopicToggledFromMenu } = useSiteContext();

  const emptyTopicProps = {
    title: '',
    _rawContent: [],
    categories: [],
  };
  const [topicProps, setTopicProps] = useState(emptyTopicProps);

  useEffect(() => {
    setTopicProps({
      ...topics[topics.findIndex(topic => topic.node.id === expandedTopic)].node,
    });
  }, [topics]);

  return (
    <StyledExpandedTopic
      style={style}
      className={classNames('expanded-topic', className)}
      viewport={viewport}
      toggledFromMenu={toggledFromMenu}
      scrollY={scrollY}
    >
      <CloseButton handleClick={() => {
        setTopicProps(emptyTopicProps);
        setExpandedTopic(null);
        setTopicToggledFromMenu(false);
      }} />
      <Heading className="expanded-topic-title" h2>
        {topicProps.title}
      </Heading>
      <Content className="topic-content">{topicProps._rawContent}</Content>
      {topicProps.categories && (
        <>
          <h2 className="list-heading">What We Do</h2>
          <CatList categories={topicProps.categories} />
        </>
      )}
    </StyledExpandedTopic>
  );
};

const StyledExpandedTopic = styled(animated.div)`
  padding: 3.5rem 2.8rem;
  background: ${({ theme }) => theme.offWhite};
  .list-heading {
    color: ${({ theme }) => theme.orange};
    text-align: center;
    font-size: 3.6rem;
  }
  ${({ toggledFromMenu, scrollY, viewport }) => toggledFromMenu && `
    position: absolute;
    top: ${viewport.width * .3333 + scrollY}px;
    left: 0px;
  `}
  ${media.break`
    width: calc(100% - 150px);
    max-width: ${({ theme }) => theme.topics.expandedWidth}px;
    left: 75px;
    top: 10%;
    height: 80%;
    z-index: 5;
    .topic-content.block-content {
      padding: ${({ viewport }) => 135 - viewport.height * 0.1}px 1rem 0; 
    }
    .expanded-topic-title {
      display: none;
    }
    ${grid.enabled`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 45px 1fr;
      align-items: start;
      padding-left: 6rem;
      padding-right: 12rem;
      grid-template-areas:
        'content list-heading'
        'content list';

      .block-content {
        grid-area: content;
      }
      .list-heading {
        grid-area: list-heading;
      }
    `}
  `}

  @media (min-width: ${900 + 75 + 75}px) {
    left: 50%;
    transform: translateX(-50%);
    padding-left: 8rem;
    padding-right: 12rem;
  }
`;

export default ExpandedTopic;
