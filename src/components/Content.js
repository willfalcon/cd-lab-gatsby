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

const Content = React.forwardRef(({ children, className }, ref) => {
  return (
    <ContentContainer className={classNames('block-content', className)} ref={ref}>
      <BlockContent
        blocks={children}
        projectId="sgba0i04"
        dataset="gatsby"
        serializers={serializers}
      />
    </ContentContainer>
  );
});

const ContentContainer = styled.div`
  .content-button {
    display: inline-block;
  }
  strong {
    font-weight: bold;
    .what-we-do & {
      font-weight: ${({ theme }) => theme.font.semibold};
    }
  }
  .what-we-do & {
    font-family: ${({ theme }) => theme.font.heading};
  }
`;

export default Content;
