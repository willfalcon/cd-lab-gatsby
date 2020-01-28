import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const Content = ({ children }) => {
  return (
    <div className="block-content">
      <BlockContent blocks={children} projectId="sgba0i04" dataset="dev" />
    </div>
  );
};

export default Content;
