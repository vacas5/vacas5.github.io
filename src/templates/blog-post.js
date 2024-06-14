import React from "react";
import get from "lodash/get";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const unsplashPhoto = get(data, "unsplashPhoto");
  const banner = get(data, "unsplashPhoto.urls.full");
  return (
    <Layout location={location} banner={banner}>
      <div className="blog_post">
        <div className="mobile_photo">
          <img
            src={unsplashPhoto.urls.regular}
            alt={unsplashPhoto.description}
          />
        </div>
        <p className="photo_credit">
          <small>
            <em>
              Photo by{" "}
              <a href={unsplashPhoto.user.links.html}>
                {unsplashPhoto.user.name}
              </a>{" "}
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
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default BlogPostTemplate;

export const Head = ({ data }) => {
  const post = data.markdownRemark;
  const siteMetadata = get(data, "site.siteMetadata");
  const unsplashPhoto = get(data, "unsplashPhoto");
  return (
    <>
      <title>{`${post.frontmatter.title} | ${siteMetadata.title}`}</title>
      <meta name="description" content={post.excerpt} />
      <link rel="icon" type="image/png" href={siteMetadata.favicon} />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta name="og:description" content={post.excerpt} />
      <meta
        property="og:url"
        content={`${siteMetadata.url}${post.frontmatter.path}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMetadata.author} />
      <meta property="og:image" content={unsplashPhoto.urls.small} />
      <meta name="twitter:image" content={unsplashPhoto.urls.small} />
      <meta name="twitter:image:alt" content={siteMetadata.title} />
    </>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $unsplash: String!) {
    site {
      siteMetadata {
        title
        author
        favicon
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
`;
