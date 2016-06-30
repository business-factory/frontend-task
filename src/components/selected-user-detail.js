import React, { Component } from 'react'

export default class SelectUserDetail extends Component {
  linkify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
  }

  render() {
    const user = this.props.user

    if (!user) {
      return false
    }

    return (
      <div className='selected-user-detail'>
        <figure>
          <img src={String(user.profile_image_url).replace('_normal', '_400x400') } alt={user.name} />
        </figure>
        <ul>
          <li className="highlight-field"><strong>{user.name}</strong></li>
          <li className="opacity-5"><small> @{user.screen_name}</small></li>
          <li>{user.location}</li>
          <li dangerouslySetInnerHTML={{ __html: this.linkify(user.description) }}></li>
          <li><strong>Followers</strong>: {parseInt(user.followers_count).toLocaleString() }</li>
          <li><strong>Friends</strong>: {parseInt(user.friends_count).toLocaleString() }</li>
          <li><strong>Listed</strong>: {parseInt(user.listed_count).toLocaleString() }</li>
          <li><strong>Favourites</strong>: {parseInt(user.favourites_count).toLocaleString() }</li>
        </ul>
      </div>
    )
  }
}
