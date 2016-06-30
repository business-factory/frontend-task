import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTweetsAction } from '../actions/index'
import { Button } from 'react-bootstrap'

class TweetQueryFilter extends Component {
  constructor(props) {
    super(props)

    // this.state = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault()

    this.props.fetchTweetsAction(this.props.user.id)
  }

  render() {
    const user = this.props.user

    if (!user) {
      return (
        <div className='text-xs-center cover-content'>
          <h3>Lorem Ipsum is not simply random text</h3>
        </div>
      )
    }

    return (
      <form className='tweet-query-filter' onSubmit={this.onFormSubmit}>
        <Button type='submit'>Get tweets</Button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTweetsAction: fetchTweetsAction
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(TweetQueryFilter)
