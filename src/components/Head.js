import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ canonicalUrl, metaDescription, title, pageTitle, home }) => {
  const titleTag = title ? title : pageTitle;
  // TODO: Do something with canonicalUrl setting
  const {
    sanitySiteSettings: { customCSS, title: siteTitle },
  } = useStaticQuery(graphql`
    {
      sanitySiteSettings(_id: { eq: "cdSiteSettings" }) {
        customCSS {
          code
        }
        title
      }
    }
  `);
  return (
    <Helmet
      titleTemplate={home ? siteTitle : `%s | ${siteTitle}`}
      title={titleTag}
    >
      <link rel="stylesheet" href="https://use.typekit.net/vcl0nfa.css" />
      <style type="text/css">{customCSS.code}</style>
      {metaDescription && (
        <meta name="description" content={metaDescription} />
      )}
    </Helmet>
  );
};

export default Head;
