import React from 'react';
import Helmet from 'react-helmet';

import { useSiteMetadata } from './hooks';

const OpenGraph = ({ title, url, image, type, seo, location }) => {
  console.log(seo);
  const openTitle = seo.title ? seo.title : title;
  const { siteUrl } = useSiteMetadata();
  const openUrl = url ? url : `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      <meta property="og:title" content={openTitle} />
      <meta property="og:url" content={openUrl} />
      {type && <meta property="og:type" content={type} />}
      {seo.metaDescription && (
        <meta property="og:description" content={seo.metaDescription} />
      )}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default OpenGraph;
