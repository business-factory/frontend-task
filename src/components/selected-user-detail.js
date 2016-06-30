import React, { Component } from 'react'

export default class SelectUserDetail extends Component {
  render() {
    const user = this.props.user
    
    if (!user) {
      return false
    }
    
    return (
      <div className='selected-user-detail'>
        <figure>
          <img src={String(user.profile_image_url).replace('_normal', '_400x400')} alt={user.name} />
        </figure>
        <div><strong>{user.name}</strong></div>
        <div className="opacity-5"><small>@{user.screen_name}</small></div>
        <div>{user.location}</div>
        <div>{user.description}</div>
        <div>{user.followers_count}</div>
        <div>{user.friends_count}</div>
        <div>{user.listed_count}</div>
        <div>{user.favourites_count}</div>
      </div>
    )
	}
}
