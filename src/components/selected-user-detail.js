import React, { Component } from 'react'
import { FaMapMarker, FaTwitter, FaStar, FaUser, FaThumbsOUp } from 'react-icons/lib/fa'

export default class SelectUserDetail extends Component {
  linkify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
  }

  render() {
    const { user } = this.props

    if (!user) {
      return false
    }

    return (
      <div className="selected-user-detail">
        <div className="container">
          <figure>
            <img src={String(user.profile_image_url).replace('_normal', '_400x400') } alt={user.name} />
          </figure>
          <ul>
            <li className="highlight-field"><strong>{user.name}</strong></li>
            <li className="opacity-5">@{user.screen_name}</li>
            <li><FaMapMarker />{user.location}</li>
            <li dangerouslySetInnerHTML={{ __html: this.linkify(user.description) }}></li>
            <li><FaTwitter /><strong>Tweets</strong>: {parseInt(user.statuses_count).toLocaleString() }</li>
            <li><FaUser /><strong>Following</strong>: {parseInt(user.friends_count).toLocaleString() }</li>
            <li><FaStar /><strong>Followers</strong>: {parseInt(user.followers_count).toLocaleString() }</li>
            <li><FaThumbsOUp /><strong>Favourites</strong>: {parseInt(user.favourites_count).toLocaleString() }</li>
          </ul>
        </div>
      </div>
    )
  }
}
