import React, { Component } from 'react'
import { connect } from 'react-redux'

class TweetList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tweetList = this.props.tweets

    if (!tweetList.length) {
      return false
    }

    return (
      <table className='tweet-list table'>
        <thead>
          <tr>
            <th>th</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              td
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { tweets: state.tweets }
}

export default connect(mapStateToProps)(TweetList)