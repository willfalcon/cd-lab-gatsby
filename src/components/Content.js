import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import classNames from 'classnames';
import ReactPlayer from 'react-player';

const serializers = {
  types: {
    video: ({node}) => {
      const { url } = node;
      return <ReactPlayer url={url} controls />
    }
  }
}

const Content = ({ children, className }) => {
  return (
    <div className={classNames('block-content', className)}>
      <BlockContent blocks={children} projectId="sgba0i04" dataset="dev" serializers={serializers} />
    </div>
  );
};

export default Content;
