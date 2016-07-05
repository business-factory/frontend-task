import React, { Component } from 'react'
import { Link } from 'react-router'

export default class RoiHunterLogo extends Component {
  render () {
    return (
    <figure className="logo">
      <Link to={this.props.link}>
        <img src='../../img/roihunter-logo.png' />
      </Link>
    </figure>
    )
  }
}
