import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import classNames from 'classnames';

const Content = ({ children, className }) => {
  return (
    <div className={classNames('block-content', className)}>
      <BlockContent blocks={children} projectId="sgba0i04" dataset="dev" />
    </div>
  );
};

export default Content;
