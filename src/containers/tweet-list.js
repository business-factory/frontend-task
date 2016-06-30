import React, { Component } from 'react'
import { connect } from 'react-redux'

class TweetList extends Component {
  constructor(props) {
    super(props)
  }

  linkify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
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
            <th>Favorites</th>
            <th>Retweets</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tweets.map(function mappingTweets(tweet, i) {
            return (
              <tr key={i}>
                <td dangerouslySetInnerHTML={{__html: this.linkify(tweet.text)}}></td>
                <td className='text-center'>{parseInt(tweet.favorite_count).toLocaleString()}</td>
                <td className='text-center'>{parseInt(tweet.retweet_count).toLocaleString()}</td>
                <td className='text-center'>{new Date (tweet.created_at).toLocaleDateString()}</td>
              </tr>
            )
          }, this)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { tweets: state.tweets }
}

export default connect(mapStateToProps)(TweetList)