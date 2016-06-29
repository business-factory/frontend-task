import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchResultListItem from './search-result-list-item'

class SearchResultList extends Component {
  // {this.props.users.map((user) => (<SearchResultListItem key={user.id} user={user} /> ))}
  // <SearchResultListItem key={this.props.users[0].id} user={this.props.users[0]} />
  render () {
    if (!this.props.users.length) {
      return ( <div></div> )
    }
    return (
    <div className='search-result-list'>
      <ul>
        {this.props.users.map((user) => (<SearchResultListItem key={user.id} user={user} /> ))}
      </ul>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {users: state.users}
}

export default connect(mapStateToProps)(SearchResultList)
