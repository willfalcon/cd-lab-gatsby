module.exports = {
  siteMetadata: {
    title: `Creative Distillery`,
    description: `Creative Distillery works with businesses, nonprofits, and government agencies to create projects that achieve your advertising and communications goals.`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'sgba0i04',
        dataset: 'gatsby',
        watchMode: true,
        token:
          'skizl6dgayHsbkMzj8DvcGnjyMU2B6aeQr3TwbCfmMhuK6jqgXYO6BIzTnsOwn2jZfIJA1ESYffsSF3qAK3DzChzoF7gZBvhjd5PFrvR1etvZFgp3mGRnH0ZW1veKx7hAJ1PcF2BFsyZj5egfOXdk6RiPoyndsPSI5X99lruAkkqoO25FxqK',
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `creative-distillery`,
        start_url: '/',
        background_color: '#F5591F',
        icon: `src/images/favicon.png`,
      },
    },
  ],
};
