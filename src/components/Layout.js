import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import "../sass/main.scss";
import Bio from "./Bio";
import linkedIn from "../images/linkedin-icon_white.png";
import gitHub from "../images/white-github-512.png";

const Layout = ({ location, children, banner, className = "" }) => {
  let header;
  if (location.pathname === "/") {
    header = (
      <h1 className="title">
        <Link to={"/"}>Russell J. Anderson</Link>
      </h1>
    );
  } else {
    header = (
      <h3 className="title">
        <Link to={"/"}>Russell J. Anderson</Link>
      </h3>
    );
  }
  const bannerStyle = {
    backgroundImage: `url(${banner})`,
  };

  const handleLinkClick = (network) => {
    if (process.env.GATSBY_TINYBIRD_DATASOURCE_TOKEN) {
      fetch("https://api.tinybird.co/v0/events?name=social_link_clicks", {
        method: "POST",
        body: JSON.stringify({
          timestamp: new Date(),
          network,
        }),
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_TINYBIRD_DATASOURCE_TOKEN}`,
        },
      });
    }
  };

  return (
    <div className={className}>
      <div className="banner" style={bannerStyle} />
      <div className="header_wrapper">
        {header}
        <div className="social_icons">
          <a
            href="https://www.linkedin.com/in/russelljanderson"
            onClick={() => {
              handleLinkClick("LinkedIn");
            }}
          >
            <img src={linkedIn} alt="LinkedIn logo" />
          </a>
          <a
            href="https://github.com/vacas5"
            className="github"
            onClick={() => {
              handleLinkClick("Github");
            }}
          >
            <img src={gitHub} alt="Octocat" />
          </a>
        </div>
      </div>
      <div className="content_wrapper">
        <main className="content">{children}</main>
        <div className="positions">
          <Bio />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  banner: PropTypes.string,
  className: PropTypes.string,
};

export default Layout;
