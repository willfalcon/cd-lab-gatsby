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

  const [expandedTopic, setExpandedTopic] = useState(null);
  const [topicToggledFromMenu, setTopicToggledFromMenu] = useState(false);

  const {
    sanitySiteSettings,
    sanityWhatWeDo,
    allSanityProject,
    allSanityTopic,
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
          contactForm {
            id
            formBuilder {
              ... on SanityCheckBoxes {
                _key
                _type
                fieldOptions {
                  halfWidth
                  required
                }
                name
                options
              }
              ... on SanityEmailField {
                _key
                _type
                fieldOptions {
                  halfWidth
                  required
                }
                name
              }
              ... on SanityRadioButtons {
                _key
                _type
                fieldOptions {
                  halfWidth
                  required
                }
                name
                options
              }
              ... on SanityTextArea {
                _key
                _type
                fieldOptions {
                  halfWidth
                  required
                }
                name
              }
              ... on SanityTextField {
                _key
                _type
                name
                fieldOptions {
                  halfWidth
                  required
                }
              }
            }
            title
            successMessage
            _rawDescription
          }
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
      allSanityTopic(sort: { fields: _updatedAt, order: DESC }) {
        edges {
          node {
            id
            title
            _rawContent(resolveReferences: { maxDepth: 10 })
            _rawShortContent(resolveReferences: { maxDepth: 10 })
            collection {
              slug {
                current
              }
            }
            image {
              alt
              asset {
                fixed(width: 175, height: 175) {
                  ...GatsbySanityImageFixed
                }
              }
            }
            slug {
              current
            }
            categories {
              service {
                _id
                slug {
                  current
                }
                title
              }
              deactivated
            }
          }
        }
      }
    }
  `);

  const topics = allSanityTopic.edges;

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
        topics,
        expandedTopic,
        setExpandedTopic,
        topicToggledFromMenu,
        setTopicToggledFromMenu,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContext, SiteContextProvider };
export default useSiteContext;
