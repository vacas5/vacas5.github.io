import React from 'react'

class Bio extends React.Component {
  render() {
    return (
      <div className="bio">
        <p>
          <img
            className="bio-pic"
            src={`https://s3-us-west-2.amazonaws.com/russelljanderson-dev/static/bear.jpg`}
            alt={`Russell J. Anderson`}
          />
        </p>
        <p>
          I am a Web Developer in Nashville, Tennessee, working for{' '}
          <a href="https://simplyagree.com">SimplyAgree</a>. I am deeply
          involved in the product at all levels, from fine-tuning business
          requirements, to UI/UX design, to API design and development, all the
          way through to devops decisions.
        </p>
        <blockquote className="main_quote">
          Perfection is achieved, not when there is nothing more to add, but
          when there is nothing left to take away.
          <br />
          <br />
          <span className="right">&mdash; Antoine de Saint-Exup&eacute;ry</span>
        </blockquote>
      </div>
    )
  }
}

export default Bio
