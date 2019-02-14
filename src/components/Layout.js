import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import '../sass/main.scss'
import Bio from './Bio'
import twitter from '../images/icon_Twitter-White.png'
import linkedIn from '../images/linkedin-icon_white.png'
import gitHub from '../images/white-github-512.png'

const Layout = ({
  location,
  children,
  banner = 'https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/nashjs-january.jpeg',
  className = '',
}) => {
  let header
  if (location.pathname === '/') {
    header = (
      <h1 className="title">
        <Link to={'/'}>Russell J. Anderson</Link>
      </h1>
    )
  } else {
    header = (
      <h3 className="title">
        <Link to={'/'}>Russell J. Anderson</Link>
      </h3>
    )
  }
  const bannerStyle = {
    backgroundImage: `url(${banner})`,
  }
  return (
    <div className={className}>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href="https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/RJA-Badge.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Russell J. Anderson" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@simplyagree" />
      </Helmet>
      <div className="banner" style={bannerStyle} />
      <div className="header_wrapper">
        {header}
        <div className="social_icons">
          <a href="https://twitter.com/RealRealRuss">
            <img src={twitter} alt="Twitter logo" />
          </a>
          <a href="https://www.linkedin.com/in/russelljanderson">
            <img src={linkedIn} alt="LinkedIn logo" />
          </a>
          <a href="https://github.com/vacas5" className="github">
            <img src={gitHub} alt="Octocat" />
          </a>
        </div>
      </div>
      <div className="content_wrapper">
        <div className="content">{children}</div>
        <div className="positions">
          <Bio />
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  banner: PropTypes.string,
  className: PropTypes.string,
}

export default Layout
