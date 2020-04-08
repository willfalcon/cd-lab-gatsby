import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Form from './Forms/Form';

import useSiteContext from './SiteContext';

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

  const { formOptions } = useSiteContext();

  return (
    <>
      <Helmet
        titleTemplate={home ? siteTitle : `%s | ${siteTitle}`}
        title={titleTag}
      >
        <link rel="stylesheet" href="https://use.typekit.net/vcl0nfa.css" />
        <style type="text/css" data-custom-css>{customCSS.code}</style>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Helmet>
      <HiddenForm fields={formOptions.contactForm.formBuilder} {...formOptions.contactForm} />
    </>
  );
};

const HiddenForm = styled(Form)`
  display: none;
`;

export default Head;
