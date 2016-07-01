import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeFilterAction } from '../actions/index'

class FilterItem extends Component {
  constructor (props) {
    super(props)

    this.dictionary = {
      'created_at': 'Date',
      'text': 'Tweet',
      'favorite_count': 'Number of likes',
      'entities.user_mentions': 'Number of mentions',
      'entities.hashtags': 'Number of hashtags',
      'eq': 'Equals',
      'neq': 'Not equals',
      'i_contains': 'Includes',
      'i_not_contains': 'Not includes',
      'gt': 'Greater than',
      'lt': 'Less than'
    }

    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this)
  }

  onRemoveButtonClick (event, filter) {
    this.props.removeFilterAction(this.props.filter)
  }

  getLabel (prop) {
    return this.dictionary[prop]
  }

  formatValue (prop, value) {
    if (prop == 'created_at') {
      return new Date(value).toDateString()
    }
    
    return value
  }

  render () {
    return (
    <div className="filter-item">
      <button type="button" className="btn btn-sm btn-secondary" onClick={this.onRemoveButtonClick}>
        Remove
      </button>
      <span>{this.getLabel(this.props.filter.key)}</span>
      <strong>{this.getLabel(this.props.filter.comparator)}</strong>
      <span>{this.formatValue(this.props.filter.key, this.props.filter.value)}</span>
    </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    removeFilterAction: removeFilterAction
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FilterItem)
