import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import classNames from 'classnames';
import ReactPlayer from 'react-player';

import { InlineNote } from './Serializers';
import Form from './Forms/Form';

const serializers = {
  types: {
    video: ({node}) => {
      const { url } = node;
      return <ReactPlayer url={url} controls />
    },
    form: ({node}) => {
      return <Form fields={node.formBuilder} {...node} />
    }
  },
  marks: {
    note: (props) => {
      const { marks, children } = props;
      return <InlineNote {...props} />;
    }
  }
}

const Content = ({ children, className }) => {

  console.log({children});

  return (
    <div className={classNames('block-content', className)}>
      <BlockContent blocks={children} projectId="sgba0i04" dataset="gatsby" serializers={serializers} />
    </div>
  );
};

export default Content;
