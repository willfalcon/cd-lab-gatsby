const fetch = require('node-fetch');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  /**
   * Create Home Page with pre-fetched video thumbnail which you can only do here and not in the page component for some reason.
   * There really should be a gatsby version of getInitialProps
   */
  const {
    data: {
      sanityHomePage: { homeVideoId },
    },
  } = await graphql(`
    {
      sanityHomePage(_id: { eq: "homePage" }) {
        homeVideoId
      }
    }
  `);
  const thumbnailsRes = await fetch(
    `https://api.vimeo.com/videos/${homeVideoId}/pictures`,
    {
      headers: {
        Authorization: 'bearer cabd18ff9e594c5abe72ddbc5878aed1',
      },
    }
  );
  const thumbnails = await thumbnailsRes.json();
  const thumbnail =
    thumbnails.data[0].sizes[
      thumbnails.data[0].sizes.findIndex(size => size.width === 640)
    ].link;
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/home.js'),
    context: { thumbnail },
  });

  /**
   * Get services and create pages
   */

  const {
    data: {
      allSanityCategory: { edges: services },
    },
  } = await graphql(`
    {
      allSanityCategory {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  services.forEach(service => {
    createPage({
      path: `/service/${service.node.slug.current}`,
      component: require.resolve('./src/templates/singleService.js'),
      context: { slug: service.node.slug.current },
    });
    console.log(`Created single service page for ${service.node.title}`);
  });

  /**
   * Get Collections and create pages
   */

  const {
    data: {
      allSanityCollection: { edges: collections },
    },
  } = await graphql(`
    {
      allSanityCollection {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  collections.forEach(collection => {
    createPage({
      path: `/collection/${collection.node.slug.current}`,
      component: require.resolve('./src/templates/singleCollection.js'),
      context: { slug: collection.node.slug.current },
    });
    console.log(`Created single Collection page for ${collection.node.title}`);
  });

  /**
   * Get Blog posts and create pages
   */

  const {
    data: {
      allSanityPost: { edges: posts },
    },
  } = await graphql(`
    {
      allSanityPost {
        edges {
          node {
            id
            slug {
              current
            }
            title
          }
        }
      }
    }
  `);

  posts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug.current}`,
      component: require.resolve('./src/templates/post.js'),
      context: { slug: post.node.slug.current },
    });
    console.log(`Created Post page for ${post.node.title}`);
  });
};
