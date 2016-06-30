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
      <table className='tweet-list table table-striped'>
        <thead>
          <tr>
            <th>Tweet</th>
            <th>Date</th>
            <th>Favorites</th>
            <th>Retweets</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tweets.map(function mappingTweets(tweet, i) {
            return (
              <tr key={i}>
                <td>{tweet.text}</td>
                <td className='text-center'>{new Date (tweet.created_at).toLocaleDateString()}</td>
                <td className='text-center'>{tweet.favorite_count}</td>
                <td className='text-center'>{tweet.retweet_count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { tweets: state.tweets }
}

export default connect(mapStateToProps)(TweetList)