import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

class TweetQueryFilter extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault()
    // this.props.fetchTweetsAction(this.props.user.id)
  }

  render() {
    const tweets = this.props.tweets
    const isLoading = this.props.loading_status

    if (!tweets.length) {
      return (
        <div className='text-xs-center cover-content'>
          <h3>{isLoading ? 'Loading' : 'Choose a user to see its tweets'}</h3>
        </div>
      )
    }

    return (
      <form className='tweet-query-filter' onSubmit={this.onFormSubmit}>
        <Button type='submit' bsStyle="link">Filter tweets</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    loading_status: state.loading_status
  }
}

export default connect(mapStateToProps)(TweetQueryFilter)
