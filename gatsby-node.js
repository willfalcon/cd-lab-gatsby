const fetch = require('node-fetch');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
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
      allSanityProject: { group },
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
              video
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
      context: { slug: service.node.slug.current, project: false },
    });
    console.log(`Created single service page for ${service.node.title}`);

    /**
     * Create single project pages for each project on top of each service
     */
    const serviceGroup = group.filter(
      group => group.fieldValue === service.node.slug.current
    )[0];
    if (serviceGroup) {
      serviceGroup.edges.map(project => {
        createPage({
          path: `/service/${service.node.slug.current}/${project.node.slug.current}`,
          component: require.resolve('./src/templates/singleService.js'),
          context: {
            slug: service.node.slug.current,
            project: project.node.slug.current,
            video: project.node.video,
          },
        });
        console.log(
          `Created single project page for ${project.node.title} on top of service ${service.node.title}.`
        );
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
              video
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
        context: {
          slug: collection.node.slug.current,
          project: project.slug.current,
          video: project.video,
        },
      });
      console.log(
        `Created single Project page for ${project.title} on top of Collection ${collection.node.title}`
      );
    });
  });

  /**
   * Create Latest Projects Collection
   */

  const {
    data: { sanityLatestCollection },
  } = await graphql(`
    {
      sanityLatestCollection {
        title
        slug {
          current
        }
        numberProjects
      }
    }
  `);

  createPage({
    path: `/collection/${sanityLatestCollection.slug.current}`,
    component: require.resolve('./src/templates/latestCollection.js'),
    context: {
      numProjects: sanityLatestCollection.numberProjects,
      slug: sanityLatestCollection.slug.current,
    },
  });
  console.log(
    `Created Latest Projects Collection at: ${sanityLatestCollection.slug.current}`
  );

  const {
    data: { allSanityProject: latestProjects },
  } = await graphql(`
    {
      allSanityProject(
        limit: ${sanityLatestCollection.numberProjects}
        sort: { fields: _createdAt, order: DESC }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
            title
            video
          }
        }
      }
    }
  `);

  latestProjects.edges.forEach(({ node: project }) => {
    createPage({
      path: `/collection/${sanityLatestCollection.slug.current}/${project.slug.current}`,
      component: require.resolve('./src/templates/latestCollection.js'),
      context: {
        numProjects: sanityLatestCollection.numberProjects,
        slug: sanityLatestCollection.slug.current,
        project: project.slug.current,
        video: project.video,
      },
    });
    console.log(
      `Created single Project page for ${project.title} on top of Latest Projects Collection`
    );
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

  const {
    data: {
      sanitySiteSettings: { redirects },
    },
  } = await graphql(`
    {
      sanitySiteSettings(_id: { eq: "cdSiteSettings" }) {
        redirects {
          temporary
          from
          to
        }
      }
    }
  `);

  redirects.forEach(({ from, to, temporary = false }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: temporary ? temporary : true,
    });
    console.log(
      `Created ${temporary ? '302' : '301'} redirect from ${from} to ${to}.`
    );
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type SanityProject {
      videoThumbnail: File @link(from: "videoThumb___NODE")
    }
  `);
};

async function getThumb(id) {
  const thumbnailsRes = await fetch(
    `https://api.vimeo.com/videos/${id}/pictures`,
    {
      headers: {
        Authorization: 'bearer cabd18ff9e594c5abe72ddbc5878aed1',
      },
    }
  );
  const thumbnails = await thumbnailsRes.json();
  return thumbnails.data[0].sizes[
    thumbnails.data[0].sizes.findIndex(size => size.width === 640)
  ].link;
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === 'SanityProject' && node.videoID) {
    const thumb = await getThumb(node.videoID);
    // console.log(thumb);
    let fileNode = await createRemoteFileNode({
      url: thumb, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.videoThumb___NODE = fileNode.id;
    }
  }
};
