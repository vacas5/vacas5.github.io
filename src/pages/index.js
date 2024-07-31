import React from "react";
import { Link } from "gatsby";
import get from "lodash/get";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

const BlogIndex = ({ data, location }) => {
  const siteMetadata = get(data, "site.siteMetadata");
  const posts = get(data, "allMarkdownRemark.edges");

  return (
    <Layout location={location} banner={siteMetadata.image}>
      <h2 className="subtitle">Posts</h2>
      {posts.map((post) => {
        if (post.node.path !== "/404/") {
          const title = get(post, "node.frontmatter.title") || post.node.path;
          return (
            <div key={post.node.frontmatter.path}>
              <h3 className="status">
                <Link to={post.node.frontmatter.path}>{title}</Link>
              </h3>
              <small>{post.node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          );
        }
        return false;
      })}
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default BlogIndex;

export const Head = ({ data }) => {
  const siteMetadata = get(data, "site.siteMetadata");
  return (
    <>
      <title>{`Posts | ${siteMetadata.title}`}</title>
      <meta name="description" content={siteMetadata.description} />
      <link rel="icon" type="image/png" href={siteMetadata.favicon} />
      <meta property="og:title" content={siteMetadata.title} />
      <meta name="og:description" content={siteMetadata.description} />
      <meta property="og:url" content={siteMetadata.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMetadata.author} />
      <meta property="og:image" content={siteMetadata.image} />
      <meta name="twitter:image" content={siteMetadata.image} />
      <meta name="twitter:image:alt" content={siteMetadata.title} />
      {process.env.GATSBY_TINYBIRD_TOKEN && (
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token={process.env.GATSBY_TINYBIRD_TOKEN}
        ></script>
      )}
    </>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        url: siteUrl
        description
        favicon
        author
        image
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
