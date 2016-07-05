import React, { Component } from 'react'
import { connect } from 'react-redux'

class TweetList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      componentList: [],
      orderBy: ''
    }

    this.reorderListByColumn = this.reorderListByColumn.bind(this)
  }

  // Lifecycle 
  componentWillReceiveProps (globalProps) {
    if (globalProps.tweets !== this.state.componentList) {
      this.setState({ componentList: globalProps.tweets })
      this.setState({ orderBy: '' })
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

  _resetOrderDirectionStatus (elementTh) {
    const currentColumn = elementTh.dataset['column']
    const elementTr = elementTh.parentNode
    var listElementsTh = elementTr.querySelectorAll('th')

    for (var i = 0, th; th = listElementsTh[i]; i++) {
      if (th.dataset['column'] == currentColumn) {
        continue
      }
      
      th.dataset.orderDirection = ''
    }
  }

  reorderListByColumn (event) {
    const elementTh = this._findClosestParentElement(event.target, 'th')
    const elementCaret = elementTh.querySelector('.caret')

    const column = elementTh.dataset['column']
    const oldOrderDirection = elementTh.dataset['orderDirection']
    const newOrderDirection = (oldOrderDirection === 'asc' ? 'desc' : 'asc')

    const sortedList = this._sortListByColumn(this.state.componentList, column, newOrderDirection)

    this.setState({ componentList: sortedList })
    this.setState({ orderBy: column })
    
    this._resetOrderDirectionStatus(elementTh)

    elementTh.dataset.orderDirection = newOrderDirection
    elementCaret.className = `caret ${newOrderDirection}`
  }

  render () {
    if (!this.state.componentList.length) {
      return false
    }

    return (
    <table className='tweet-list table table-striped'>
      <thead>
        <tr>
          <th onClick={this.reorderListByColumn} data-column="text" data-order-direction="">
            <span className={(this.state.orderBy == 'text' ? 'text-primary' : '')}>Tweet</span>
            <span className={'caret asc' + (this.state.orderBy != 'text' ? ' hidden' : '')}></span>
          </th>
          <th onClick={this.reorderListByColumn} data-column="favorite_count" data-order-direction="">
            <span className={(this.state.orderBy == 'favorite_count' ? 'text-primary' : '')}>Favorites</span>
            <span className={'caret asc' + (this.state.orderBy != 'favorite_count' ? ' hidden' : '')}></span>
          </th>
          <th onClick={this.reorderListByColumn} data-column="retweet_count" data-order-direction="">
            <span className={(this.state.orderBy == 'retweet_count' ? 'text-primary' : '')}>Retweets</span>
            <span className={'caret asc' + (this.state.orderBy != 'retweet_count' ? ' hidden' : '')}></span>
          </th>
          <th onClick={this.reorderListByColumn} data-column="created_at" data-order-direction='desc'>
            <span className={(this.state.orderBy == 'created_at' ? 'text-primary' : '')}>Date</span>
            <span className={'caret asc' + (this.state.orderBy != 'created_at' ? ' hidden' : '')}></span>
          </th>
        </tr>
      </thead>
      <tbody>
        {this.state.componentList.map(function mappingTweets (tweet, i) {
           return (
           <tr key={i}>
             <td dangerouslySetInnerHTML={{ __html: this._linkify(tweet.text) }}></td>
             <td>
               {parseInt(tweet.favorite_count).toLocaleString()}
             </td>
             <td>
               {parseInt(tweet.retweet_count).toLocaleString()}
             </td>
             <td>
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
