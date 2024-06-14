const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  siteMetadata: {
    title: "Russell J. Anderson, Software Engineer",
    author: "Russell J. Anderson",
    siteUrl: "http://russelljanderson.com",
    description:
      "A blog on software development, engineering leadership, product development, javascript, python, React, Django, et al",
    favicon:
      "https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/RJA-Badge.png",
    image:
      "https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/nashjs-january.jpeg",
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 8,
        },
      },
    },
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        clientId: `${process.env.UNSPLASH_APP_ID}`,
        collections: [`1578508`],
        perPage: `50`,
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-meta-redirect`, // make sure to put last in array
  ],
};
