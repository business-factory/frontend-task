import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { applyFilterAction, fetchTweetsAction, showLoadingStatus, clearAllFilterAction } from '../actions/index'
import FilterForm from './filter-form'
import FilterItem from './filter-item'
import ModalLoadedTweetsStatistics from '../components/modal-loaded-tweets-statistics'
import { FaLineChart, FaRefresh, FaFilter } from 'react-icons/lib/fa'

class TweetQueryFilter extends Component {
  constructor (props) {
    super(props)

    this.state = { isModalVisible: false }
    this.onFilterTweetsButtonClick = this.onFilterTweetsButtonClick.bind(this)
    this.onReloadTweetsButtonClick = this.onReloadTweetsButtonClick.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
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

  setModalVisible () {
    this.setState({ isModalVisible: true })
  }

  onModalClose () {
    this.setState({ isModalVisible: false })
  }

  onFilterTweetsButtonClick (event) {
    const config = {
      'created_at': 'to-timestamp',
      'text': 'to-lowercase',
      'favorite_count': 'to-number',
      'entities.user_mentions': 'get-count',
      'entities.hashtags': 'get-count'
    }

    const filters = this.props.filters.map((filter) => {
      switch (filter.key) {
        case 'created_at':
          filter.value = new Date(filter.value).getTime()
          break
        case 'text':
          filter.value = String(filter.value).toLowerCase()
          break
        default:
          filter.value = parseFloat(filter.value)
          break
      }
      
      return filter
    })

    const tweetList = this.props.tweets
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
    this.props.showLoadingStatus()
    this.props.clearAllFilterAction()
    this.props.fetchTweetsAction(this.props.user.id)
  }

  render () {
    const tweets = this.props.tweets
    const isLoading = this.props.loading_status
    const filters = this.props.filters || []

    if (!tweets.length && !filters.length) {
      return false
    }

    return (
    <div className="tweet-query-filter p-a-0">
      <div className="tweet-query-filter-header">
        <label>
          Reduce your tweet’s range based on:
        </label>
        <FilterForm />
      </div>
      <div className="tweet-query-filter-body">
        {filters.map(function renderingKeys (filtr, i) {
           return (<FilterItem key={i} filter={filtr} />)
         })}
      </div>
      <div className="tweet-query-filter-footer">
        {filters.length > 0 ? (<button type="button" className="btn btn-sm btn-primary" onClick={this.onFilterTweetsButtonClick}>
                                 <FaFilter />Search Tweets
                               </button>) : null}
        <button type="button" className="btn btn-sm btn-secondary pull-xs-right m-a-0" onClick={this.onReloadTweetsButtonClick}>
          <FaRefresh />{!isLoading ? 'Reload all Tweets' : 'Loading...'}
        </button>
        <button type="button" className="btn btn-sm btn-secondary" onClick={this.setModalVisible}>
          <FaLineChart />Tweets Statistics
        </button>
      </div>
      <ModalLoadedTweetsStatistics isVisible={this.state.isModalVisible} onModalClose={this.onModalClose} tweets={tweets} />
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
    fetchTweetsAction: fetchTweetsAction,
    showLoadingStatus: showLoadingStatus,
    clearAllFilterAction: clearAllFilterAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetQueryFilter)
