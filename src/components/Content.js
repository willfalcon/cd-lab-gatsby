import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import classNames from 'classnames';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import { InlineNote, ContentLink } from './Serializers';
import Form from './Forms/Form';

const serializers = {
  types: {
    video: ({ node }) => {
      const { url } = node;
      return <ReactPlayer url={url} controls />;
    },
    form: ({ node }) => {
      return <Form fields={node.formBuilder} {...node} />;
    },
  },
  marks: {
    note: props => {
      // const { marks, children } = props;
      return <InlineNote {...props} />;
    },
    link: props => {
      return <ContentLink {...props} />;
    },
  },
};

const Content = ({ children, className }) => {
  return (
    <ContentContainer className={classNames('block-content', className)}>
      <BlockContent
        blocks={children}
        projectId="sgba0i04"
        dataset="gatsby"
        serializers={serializers}
      />
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  .content-button {
    display: inline-block;
  }
`;

export default Content;
