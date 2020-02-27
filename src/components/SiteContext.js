import React, { useState, useContext, useLayoutEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { useWindowSize } from './utils';
import theme from './theme';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, home }) => {
  const [ready, makeReady] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const viewport = useWindowSize();

  function toggleMenu(open) {
    if (open === undefined) {
      setMenuOpen(!menuOpen);
    } else if (open !== undefined && typeof open === 'boolean') {
      setMenuOpen(open);
    } else {
      setMenuOpen(false);
    }
  }

  useLayoutEffect(() => {
    makeReady(true);
  }, []);

  const {
    sanitySiteSettings,
    sanityWhatWeDo,
    allSanityProject,
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
        makeReady,
        toggleMenu,
        menuOpen,
        home,
        ...sanitySiteSettings,
        ...sanityWhatWeDo,
        ...allSanityProject,
        mobile: ready ? viewport.width < theme.sizes.break : false,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContext, SiteContextProvider };
export default useSiteContext;
