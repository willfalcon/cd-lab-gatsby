import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { getViewport } from './utils';
import theme from './theme';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, home }) => {
  const [ready, makeReady] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const isClient = typeof window === 'object';

  useEffect(() => {
    if (!isClient) {
      makeReady(false);
      return false;
    }
    function updateViewport() {
      makeReady(false);
      setViewport(getViewport());
      makeReady(true);
    }
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  });

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu(open) {
    if (open === undefined) {
      setMenuOpen(!menuOpen);
    } else if (open !== undefined && typeof open === 'boolean') {
      setMenuOpen(open);
    } else {
      setMenuOpen(false);
    }
  }

  const {
    sanitySiteSettings,
    sanityWhatWeDo,
    allSanityProject
  } = useStaticQuery(graphql`
    query {
      sanitySiteSettings(_id: { eq: "cdSiteSettings" }) {
        collectionsCount
        customCSS {
          code
        }
        formOptions {
          errorMessage
          successMessage
        }
        redirects {
          _key
          to
          from
        }
        social {
          facebook
          instagram
          linkedin
          twitter
        }
        title
      }
      sanityWhatWeDo(_id: { eq: "whatWeDo" }) {
        topics {
          _key
          textContent
          slug {
            current
          }
          seoSettings {
            title
            metaDescription
            canonicalUrl
          }
          image {
            asset {
              fixed(width: 175) {
                ...GatsbySanityImageFixed
              }
            }
          }
          categories {
            _id
            title
            _rawDescription
            slug {
              current
            }
          }
        }
      }
      allSanityProject {
        group(field: categories___title) {
          fieldValue
          totalCount
          edges {
            node {
              categories {
                title
                id
              }
            }
          }
        }
      }
    }
  `);

  return (
    <SiteContext.Provider
      value={{
        viewport,
        ready,
        toggleMenu,
        menuOpen,
        home,
        ...sanitySiteSettings,
        ...sanityWhatWeDo,
        mobile: ready ? viewport.width < theme.sizes.break : false
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContext, SiteContextProvider };
export default useSiteContext;
