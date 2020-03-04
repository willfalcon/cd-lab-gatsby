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
      allSanityProject: { group }
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
      allSanityProject {
        group(field: categories___slug___current) {
          fieldValue
          totalCount
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
    }
  `);

  services.forEach(service => {
    createPage({
      path: `/service/${service.node.slug.current}`,
      component: require.resolve('./src/templates/singleService.js'),
      context: { slug: service.node.slug.current },
    });
    console.log(`Created single service page for ${service.node.title}`);

    /**
     * Create single project pages for each project on top of each service
     */
    const serviceGroup = group.filter(group => group.fieldValue === service.node.slug.current)[0];
    if (serviceGroup) {
      serviceGroup.edges.map(edge => {
        createPage({
          path: `/service/${service.node.slug.current}/${edge.node.slug.current}`,
          component: require.resolve('./src/templates/singleService.js'),
          context: { slug: service.node.slug.current, project: edge.node.slug.current }
        });
        console.log(`Created single project page for ${edge.node.title} on top of service ${service.node.title}.`);
      });
    }
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
            projects {
              id
              slug {
                current
              }
              title
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
    collection.node.projects.forEach(project => {
      createPage({
        path: `/collection/${collection.node.slug.current}/${project.slug.current}`,
        component: require.resolve('./src/templates/singleCollection.js'),
        context: { slug: collection.node.slug.current, project: project.slug.current},
      });
      console.log(`Created single Project page for ${project.title} on top of Collection ${collection.node.title}`);
    })
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

  /**
   * Create Blog archive pages
   */

  const {
    data: {
      sanityBlogPage: { perPage },
    },
  } = await graphql(`
    {
      sanityBlogPage(_id: { eq: "blogPage" }) {
        perPage
      }
    }
  `);

  const numPages = Math.ceil(posts.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: require.resolve('./src/templates/blog.js'),
      context: {
        limit: perPage,
        skip: i * perPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
