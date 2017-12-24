import React from 'react'

class Bio extends React.Component {
  render() {
    return (
      <p>
        <img
          src={`https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAbLAAAAJGNmMDNlY2E2LWFjZTYtNDk4OC1hMDY4LTZjY2Y3NDFkNDg5Yg.jpg`}
          alt={`Russell J. Anderson`}
        />
        Written by <strong>Kyle Mathews</strong> who lives and works in San
        Francisco building useful things.{' '}
        <a href="https://twitter.com/kylemathews">
          You should follow him on Twitter
        </a>
      </p>
    )
  }
}

export default Bio
