import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectUserDetail from '../components/selected-user-detail'
import TweetQueryFilter from '../containers/tweet-query-filter'
import TweetList from '../containers/tweet-list'

class AppPanel extends Component {
  render () {
    const { selected_user } = this.props
    
    return (
    <div>
      <SelectUserDetail user={selected_user} />
      <div className="container">
        <TweetQueryFilter user={selected_user} />
        <TweetList />
      </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return { selected_user: state.selected_user }
}

export default connect(mapStateToProps)(AppPanel)
