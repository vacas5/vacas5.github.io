import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import '../sass/main.scss'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div className="container">
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')}>
          <meta property="og:title" content={this.props.data.site.siteMetadata.title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.props.data.site.siteMetadata.url} />
          <meta property="og:image" content="https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/sitecap.jpg" />
        </Helmet>
        <div className="content">
          <h2 className="subtitle">Posts</h2>
          {posts.map(post => {
            if (post.node.path !== '/404/') {
              const title = get(post, 'node.frontmatter.title') || post.node.path
              return (
                <div key={post.node.frontmatter.path}>
                  <h3 className="status">
                    <Link to={post.node.frontmatter.path} >
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
        <div className="positions">
          <Bio />
        </div>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        url
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
