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
        <style type="text/css" data-custom-css>
          {customCSS.code}
        </style>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        {/* MailerLite Universal */}
        <script>
          {`
              (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
                var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
              f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
              var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
              _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

              var ml_account = ml('accounts', '1953940', 'f9a5x1p7f3', 'load');
            `}
        </script>
        {/* End MailerLite Universal */}
      </Helmet>
      <HiddenForm
        fields={formOptions.contactForm.formBuilder}
        {...formOptions.contactForm}
      />
    </>
  );
};

const HiddenForm = styled(Form)`
  display: none;
`;

export default Head;
