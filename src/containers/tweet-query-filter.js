import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilterForm from './filter-form'
import FilterItem from './filter-item'

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
            return (<FilterItem key={i} filter={filtr}/>)
          })}
        </div>        
        <div className="tweet-query-filter-footer">
          {filters.length > 0 ? (<button type="button" className="btn btn-sm btn-primary">Filter Tweets</button>) : null}          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    filters: state.filters,
    loading_status: state.loading_status
  }
}

export default connect(mapStateToProps)(TweetQueryFilter)
