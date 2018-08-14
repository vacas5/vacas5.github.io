import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import PropTypes from 'prop-types'

class BlogPostTemplate extends React.Component {
  constructor(props, context) {
    super(props)

    context.changeBanner(props.data.unsplashPhoto.urls.full)
  }
  render() {
    const post = this.props.data.markdownRemark
    const siteMetadata = get(this.props, 'data.site.siteMetadata')
    const unsplashPhoto = this.props.data.unsplashPhoto

    return (
      <div className="blog_post">
        <Helmet title={`${post.frontmatter.title} | ${siteMetadata.title}`}>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.frontmatter.title} />
          <meta name="og:description" content={siteMetadata.description} />
          <meta
            property="og:url"
            content={`${siteMetadata.url}${post.frontmatter.path}`}
          />
          <meta property="og:image" content={unsplashPhoto.urls.small} />
          <meta name="twitter:image" content={unsplashPhoto.urls.small} />
          <meta name="twitter:image:alt" content={siteMetadata.title} />
        </Helmet>
        <div className="mobile_photo">
          <img
            src={unsplashPhoto.urls.regular}
            alt={unsplashPhoto.description}
          />
        </div>
        <p className="photo_credit">
          <small>
            <em>
              Photo by{' '}
              <a href={unsplashPhoto.user.links.html}>
                {unsplashPhoto.user.name}
              </a>{' '}
              from the fine service <a href="http://unsplash.com">Unsplash</a>.
            </em>
          </small>
        </p>
        <h1>{post.frontmatter.title}</h1>
        <p className="date_line">
          <em>{post.frontmatter.date}</em>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

BlogPostTemplate.contextTypes = {
  changeBanner: PropTypes.func,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $unsplash: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
      excerpt
    }
    unsplashPhoto(id: { eq: $unsplash }) {
      id
      description
      urls {
        full
        regular
        small
      }
      user {
        name
        links {
          html
        }
      }
    }
  }
`
