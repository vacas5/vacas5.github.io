const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)
const axios = require(`axios`)
const crypto = require(`crypto`)

exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators
    return axios.get(`https://api.unsplash.com/users/bojackson30/collections`, {
        params: {
            client_id: process.env.UNSPLASH_APP_ID
        }
    }).then(response => {
        return Promise.all(response.data.map(collection => {
            return axios.get(collection.links.photos, {
                params: {
                    client_id: process.env.UNSPLASH_APP_ID
                }
            }).then(res => {
                res.data.map(photo => {
                    const digest = crypto
                        .createHash(`md5`)
                        .update(JSON.stringify(photo))
                        .digest(`hex`)

                    const node = Object.assign(
                        photo,
                        {
                          parent: `__SOURCE__`,
                          children: [],
                          internal: {
                            type: `UnsplashPhoto`,
                            contentDigest: digest,
                            mediaType: `application/json`
                          },
                        }
                    )

                    createNode(node)
                    return true;
                })
            })
        }));
    }).catch(error => {
        console.log(error);
    });
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
                unsplash
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          createPage({
            path: edge.node.frontmatter.path,
            component: blogPost,
            context: {
              path: edge.node.frontmatter.path,
              unsplash: edge.node.frontmatter.unsplash || ''
            },
          })
        })
      })
    )
  })
}
