module.exports = {
  siteMetadata: {
    title: `Creative Distillery`,
    description: `Creative Distillery works with businesses, nonprofits, and government agencies to create projects that achieve your advertising and communications goals.`,
    siteUrl: `https://www.creativedistillery.com`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-18899458-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        // anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '1493901710913628',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/collection/random', '/service/random', '/post/random', '/forms'],
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: 'https://0bf7894cdf294687a093249f41a95f92@o238383.ingest.sentry.io/1407550',
        environment: process.env.NODE_ENV,
      },
    },
  ],
};
