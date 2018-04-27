const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  siteMetadata: {
    title: "Russell J. Anderson, Web Developer",
    author: "Russell J. Anderson",
    url: "http://russelljanderson.com",
    description: "A blog on web development, product development, javascript, python, React, Django, et al",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GOOGLE_ANALYTICS_ID}`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        appId: `${process.env.UNSPLASH_APP_ID}`,
        collections: [
          `1578508`
        ]
      },
    },
    `gatsby-plugin-twitter`,
  ],
}
