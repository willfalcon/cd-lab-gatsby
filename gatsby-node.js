const fetch = require('node-fetch');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data

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
  // Create a page that lists all Pokémon.
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/home.js'),
    context: { thumbnail },
  });
};
