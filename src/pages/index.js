import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

class BlogIndex extends React.Component {
  constructor(props, context) {
    super(props)

    context.changeBanner(
      'https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/nashjs-january.jpeg'
    )
  }
  render() {
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet>
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
                  <Link to={post.node.frontmatter.path}>
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
}

BlogIndex.contextTypes = {
  changeBanner: PropTypes.func,
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
