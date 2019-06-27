module.exports = {
  siteMetadata: {
    title: `WDR Datenjournalismus`,
    description: `Geschichten mit Daten erzählen im WDR`,
    author: `WDR`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WDR Datenjournalismus`,
        short_name: `WDR data`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00345e`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "stories",
        path: `${__dirname}/content/stories/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
  ],
}
