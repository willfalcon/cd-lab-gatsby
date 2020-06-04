import React from 'react';
import Helmet from 'react-helmet';

const OpenGraph = ({ title, url, description, image, type, seo }) => {
  console.log(seo);
  const openTitle = seo.title ? seo.title : title;
  const openUrl = url ? url : window.location.href;
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
