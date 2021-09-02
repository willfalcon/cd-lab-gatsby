import React from 'react';
import Helmet from 'react-helmet';

import { useSiteMetadata } from './hooks';

const Meta = ({ title, url, image, type, seo, location }) => {
  const openTitle = seo && seo.title ? seo.title : title;
  const { siteUrl } = useSiteMetadata();
  const openUrl = url ? `${siteUrl}${url}` : `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      <meta property="og:title" content={openTitle} />
      <meta property="og:url" content={openUrl} />
      <link rel="canonical" href={openUrl} />
      {type && <meta property="og:type" content={type} />}
      {seo && seo.metaDescription && (
        <meta property="og:description" content={seo.metaDescription} />
      )}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default Meta;
