module.exports = {
  siteMetadata: {
    title: `Creative Distillery`,
    description: `Creative Distillery works with businesses, nonprofits, and government agencies to create projects that achieve your advertising and communications goals.`
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "sgba0i04",
        dataset: "gatsby"
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `creative-distillery`,
        start_url: "/",
        background_color: "#F5591F",
        icon: `src/images/favicon.png`
      }
    }
  ]
};