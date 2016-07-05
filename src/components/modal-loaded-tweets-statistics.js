import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class ModalLoadedTweetsStatistics extends Component {
  favoriteCountSum (tweets = this.props.tweets) {
    return tweets.reduce((prev, curr) => {
      return prev + Number(curr.favorite_count) || 0
    }, 0)
  }

  favoriteCountAvg (tweets = this.props.tweets) {
    return this.favoriteCountSum(tweets) / tweets.length
  }

  getUserMentions (tweets = this.props.tweets) {
    return tweets.reduce((prev, curr) => {
      return curr.entities.user_mentions.length ? prev.concat(curr.entities.user_mentions) : prev
    }, []).map((tweet) => {
      return {
        id: tweet.id,
        name: tweet.screen_name,
        occurrences: 1
      }})
  }

  userMentionsSum (tweets = this.props.tweets) {
    return this.getUserMentions().length
  }

  userMentionsOccurrences () {
    var mentionList = this.getUserMentions()
    var condensedMentionList = []
    mentionList.forEach((mention) => {
      const index = condensedMentionList.findIndex((item) => {
        return item.id === mention.id
      })

      if (index !== -1) {
        condensedMentionList[index].occurrences++
        return
      }

      condensedMentionList.push(mention)
    })

    return condensedMentionList.sort(this._sortByOccurrencesDesc)
  }

  getHashtags (tweets = this.props.tweets) {
    return tweets.reduce((prev, curr) => {
      return curr.entities.hashtags.length ? prev.concat(curr.entities.hashtags) : prev
    }, []).map((hashtag) => {
      return {
        text: hashtag.text,
        occurrences: 1
      }})
  }

  getHashtagsSum (tweets = this.props.tweets) {
    return this.getHashtags().length
  }

  getHashtagsOccurrences () {
    var hashTags = this.getHashtags()
    var condensedHashTags = []

    hashTags.forEach((hashtag) => {
      const index = condensedHashTags.findIndex((item) => {
        return item.text === hashtag.text
      })

      if (index !== -1) {
        condensedHashTags[index].occurrences++
        return
      }

      condensedHashTags.push(hashtag)
    })

    return condensedHashTags.sort(this._sortByOccurrencesDesc)
  }

  _sortByOccurrencesDesc (a, b) {
    if (a.occurrences > b.occurrences) {
      return -1
    } else if (b.occurrences > a.occurrences) {
      return 1
    }
    return 0
  }

  render () {
    const favoriteCountSum = this.favoriteCountSum()
    const favoriteCountAvg = this.favoriteCountAvg()
    const userMentionsSum = this.userMentionsSum()
    const getHashtagsSum = this.getHashtagsSum()
    const userMentionsOccurrences = this.userMentionsOccurrences()
    const getHashtagsOccurrences = this.getHashtagsOccurrences()

    return (
    <Modal show={this.props.isVisible} onHide={this.props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title bsStyle="text-primary">
          Tweets Statistics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row tweets-stats">
          <article>
            <h5>{parseInt(favoriteCountSum).toLocaleString()}</h5>
            <span>Likes</span>
          </article>
          <article>
            <h5>{parseFloat(favoriteCountAvg).toLocaleString()}</h5>
            <span>Likes rate</span>
          </article>
          <article>
            <h5>{parseInt(userMentionsSum).toLocaleString()}</h5>
            <span>User mentions</span>
          </article>
          <article>
            <h5>{parseInt(getHashtagsSum).toLocaleString()}</h5>
            <span>Hashtags</span>
          </article>
          <ul>
            {userMentionsOccurrences.map(function renderMentions (mentions, i) {
               return (<li key={mentions.id}>{mentions.occurrences} @{mentions.name}</li>)
             }, this)}
          </ul>
          <ul>
            {getHashtagsOccurrences.map(function renderHashtags (hashtag, i) {
               return (<li key={i}>{hashtag.occurrences} #{hashtag.text}</li>)
             }, this)}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
    )
  }
}
