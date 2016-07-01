import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { applyFilterAction, fetchTweetsAction } from '../actions/index'
import FilterForm from './filter-form'
import FilterItem from './filter-item'

class TweetQueryFilter extends Component {
  constructor (props) {
    super(props)

    this.onFilterTweetsButtonClick = this.onFilterTweetsButtonClick.bind(this)
    this.onReloadTweetsButtonClick = this.onReloadTweetsButtonClick.bind(this)
  }

  _performComparisonAndGetThoseIds (list, filter) {
    const val = filter.value
    return list.reduce(function filterListBasedOnFilter (prev, curr, index) {
      switch (filter.comparator) {
        case 'lt':
          if (curr[filter.key] < parseFloat(val)) {
            prev.push(curr.id)
          }
          break
        case 'gt':
          if (curr[filter.key] > parseFloat(val)) {
            prev.push(curr.id)
          }
          break
        case 'i_not_contains':
          if (curr[filter.key].indexOf(val) === -1) {
            prev.push(curr.id)
          }
          break
        case 'i_contains':
          if (curr[filter.key].indexOf(val) !== -1) {
            prev.push(curr.id)
          }
          break
        case 'neq':
          if (curr[filter.key] != val) {
            prev.push(curr.id)
          }
          break
        case 'eq':
          if (curr[filter.key] == val) {
            prev.push(curr.id)
          }
          break
      }

      return prev
    }, [])
  }

  _performDataNormalization (list, config) {
    return list.map((tweet) => {
      var newObj = {id: tweet.id}
      var configKeys = Object.keys(config)

      configKeys.forEach((configKey) => {
        var instruction = config[configKey]
        var oldValue = tweet[configKey]
        var newValue

        if (configKey.indexOf('.') !== -1) {
          var splitedConfig = configKey.split('.')
          oldValue = tweet[splitedConfig[0]][splitedConfig[1]]
        }

        switch (instruction) {
          case 'to-timestamp':
            if (typeof oldValue === 'string' && !isNaN(new Date(oldValue).getTime())) {
              newValue = new Date(oldValue).getTime()
            } else {
              newValue = oldValue
            }
            break
          case 'to-lowercase':
            newValue = String(oldValue).toLowerCase()
            break
          case 'to-number':
            newValue = Number(oldValue)
            break
          case 'get-count':
            newValue = oldValue.length
            break
        }

        newObj[configKey] = newValue
      })

      return newObj
    })
  }

  onFilterTweetsButtonClick (event) {
    const tweetList = this.props.tweets
    const filters = this.props.filters
    const config = {
      'created_at': 'to-timestamp',
      'text': 'to-lowercase',
      'favorite_count': 'to-number',
      'entities.user_mentions': 'get-count',
      'entities.hashtags': 'get-count'
    }

    const normalizedTweetList = this._performDataNormalization(tweetList, config)
    const filteredIds = filters.reduce(function filterLoop (amount, filter) {
      var _allMatches = this._performComparisonAndGetThoseIds(normalizedTweetList, filter)
      var _nestedMatches = _allMatches.filter((id) => {
        return amount.indexOf(id) !== -1
      })
      return amount.length === 0 ? _allMatches : _nestedMatches
    }.bind(this), [])

    const filteredList = tweetList.filter((tweet) => {
      return filteredIds.indexOf(tweet.id) !== -1
    })

    this.props.applyFilterAction(filteredList)
  }

  onReloadTweetsButtonClick (event) {
    this.props.fetchTweetsAction(this.props.user.id)
  }

  render () {
    const tweets = this.props.tweets
    const isLoading = this.props.loading_status
    const filters = this.props.filters || []

    if (!tweets.length) {
      return (
      <div className='text-xs-center cover-content'>
        <h3>{isLoading ? 'Loading...' : 'Choose a user to see its tweets'}</h3>
      </div>
      )
    }

    return (
    <div className="tweet-query-filter p-a-0">
      <div className="tweet-query-filter-header">
        <small>* Use these rules to filter tweets</small>
        <FilterForm />
      </div>
      <div className="tweet-query-filter-body">
        {filters.map(function renderingKeys (filtr, i) {
           return (<FilterItem key={i} filter={filtr} />)
         })}
      </div>
      <div className="tweet-query-filter-footer">
        {filters.length > 0 ? (<button type="button" className="btn btn-sm btn-primary" onClick={this.onFilterTweetsButtonClick}>
                                 Filter Tweets
                               </button>) : null}
        {!isLoading ? (<button type="button" className="btn btn-sm btn-secondary" onClick={this.onReloadTweetsButtonClick}>
                         Reload Tweets
                       </button>) : null}
      </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tweets: state.tweets,
    filters: state.filters,
    loading_status: state.loading_status
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    applyFilterAction: applyFilterAction,
    fetchTweetsAction: fetchTweetsAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetQueryFilter)
