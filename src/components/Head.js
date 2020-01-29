import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = () => {
  const {
    sanitySiteSettings: { customCSS },
  } = useStaticQuery(graphql`
    {
      sanitySiteSettings(_id: { eq: "cdSiteSettings" }) {
        customCSS {
          code
        }
      }
    }
  `);
  return (
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/vcl0nfa.css" />
      <style type="text/css">{customCSS.code}</style>
    </Helmet>
  );
};

export default Head;
