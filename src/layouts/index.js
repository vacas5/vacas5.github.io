import React from 'react'
import Link from 'gatsby-link'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    if (location.pathname === '/') {
      header = (
        <h1 className="title">
          <Link to={'/'} >
            Russell J. Anderson
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3 className="title">
          <Link to={'/'}>
            Russell J. Anderson
          </Link>
        </h3>
      )
    }
    return (
      <div className="wrapper">
        {header}
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
