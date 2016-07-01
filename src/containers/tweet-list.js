import React, { Component } from 'react'
import { connect } from 'react-redux'

class TweetList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      componentList: [],
      orderBy: 'created_at'
    }

    this.reorderListByColumn = this.reorderListByColumn.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tweets !== this.state.componentList) {
      this.setState({ componentList: nextProps.tweets })
    }
  }

  _linkify (text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>'
    })
  }

  _sortListByColumn (list, column, orderDirection) {
    var outputList

    function makeSortable (data) {
      if (typeof data === 'string' && !isNaN(new Date(data).getTime())) {
        return new Date(data).getTime()
      } else if (typeof data === 'string') {
        return data.toLowerCase().trim()
      } else if (data.hasOwnProperty('props')) {
        return data.props.dangerouslySetInnerHTML.__html.toLowerCase()
      } else {
        return data
      }
    }

    // new Date('a').toString()
    // new Date("Wed Jun 29 23:01:04 +0000 2016").getTime()

    outputList = list.sort(function sort (a, b) {
      if (makeSortable(a[column]) > makeSortable(b[column])) {
        return 1
      } else if (makeSortable(b[column]) > makeSortable(a[column])) {
        return -1
      }
      return 0
    })

    if (orderDirection === 'desc') {
      outputList.reverse()
    }

    return outputList
  }

  _findClosestParentElement (el, tag) {
    while (el.parentNode) {
      if (String(el.tagName).toLowerCase() === tag) {
        return el
      }
      el = el.parentNode
    }

    return null
  }

  _resetOrderDirectionStatus () {}

  reorderListByColumn (event) {
    var thElement = this._findClosestParentElement(event.target, 'th')
    const column = thElement.dataset['field']
    const oldOrderDirection = thElement.dataset['orderDirection']
    const newOrderDirection = (oldOrderDirection === 'asc' ? 'desc' : 'asc')

    const sortedList = this._sortListByColumn(this.props.tweets, column, newOrderDirection)

    this.setState({ componentList: sortedList })
    this.setState({ orderBy: column })

    thElement.dataset.orderDirection = newOrderDirection
    thElement.querySelector('.caret').classList.remove(oldOrderDirection)
    thElement.querySelector('.caret').classList.add(newOrderDirection)
  }

  render () {
    if (!this.state.componentList.length) {
      return false
    }

    return (
    <table className='tweet-list table table-striped'>
      <thead>
        <tr>
          <th onClick={this.reorderListByColumn} data-field='text' data-order-direction='asc'>
            <span>Tweet</span><span className={'caret asc' + (this.state.orderBy != 'text' ? ' hidden' : '')}></span>
          </th>
          <th
            onClick={this.reorderListByColumn}
            data-field='favorite_count'
            data-order-direction='asc'
            className='text-center'>
            <span>Favorites</span><span className={'caret asc' + (this.state.orderBy != 'favorite_count' ? ' hidden' : '')}></span>
          </th>
          <th
            onClick={this.reorderListByColumn}
            data-field='retweet_count'
            data-order-direction='asc'
            className='text-center'>
            <span>Retweets</span><span className={'caret asc' + (this.state.orderBy != 'retweet_count' ? ' hidden' : '')}></span>
          </th>
          <th
            onClick={this.reorderListByColumn}
            data-field='created_at'
            data-order-direction='desc'
            className='text-center'>
            <span>Date</span><span className={'caret asc' + (this.state.orderBy != 'created_at' ? ' hidden' : '')}></span>
          </th>
        </tr>
      </thead>
      <tbody>
        {this.state.componentList.map(function mappingTweets (tweet, i) {
           return (
           <tr key={i}>
             <td dangerouslySetInnerHTML={{ __html: this._linkify(tweet.text) }}></td>
             <td className='text-center'>
               {parseInt(tweet.favorite_count).toLocaleString()}
             </td>
             <td className='text-center'>
               {parseInt(tweet.retweet_count).toLocaleString()}
             </td>
             <td className='text-center'>
               {new Date(tweet.created_at).toLocaleDateString()}
             </td>
           </tr>
           )
         }, this)}
      </tbody>
    </table>
    )
  }
}

function mapStateToProps (state) {
  return { tweets: state.tweets }
}

export default connect(mapStateToProps)(TweetList)
