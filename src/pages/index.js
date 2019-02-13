import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const BlogIndex = ({ data, location }) => {
  const siteMetadata = get(data, 'site.siteMetadata')
  const posts = get(data, 'allMarkdownRemark.edges')

  return (
    <Layout location={location}>
      <Helmet title={`Posts | ${siteMetadata.title}`}>
        <meta name="description" content={siteMetadata.description} />
        <meta property="og:title" content={siteMetadata.title} />
        <meta name="og:description" content={siteMetadata.description} />
        <meta property="og:url" content={siteMetadata.url} />
        <meta
          property="og:image"
          content="https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/sitecap.jpg"
        />
        <meta
          name="twitter:image"
          content="https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/sitecap.jpg"
        />
        <meta name="twitter:image:alt" content={siteMetadata.title} />
      </Helmet>
      <h2 className="subtitle">Posts</h2>
      {posts.map(post => {
        if (post.node.path !== '/404/') {
          const title = get(post, 'node.frontmatter.title') || post.node.path
          return (
            <div key={post.node.frontmatter.path}>
              <h3 className="status">
                <Link to={post.node.frontmatter.path}>{title}</Link>
              </h3>
              <small>{post.node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          )
        }
        return false
      })}
    </Layout>
  )
}

BlogIndex.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        url
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
