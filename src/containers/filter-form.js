import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilterAction } from '../actions/index'
import { FaPlus } from 'react-icons/lib/fa'

class FilterForm extends Component {
  constructor (props) {
    super(props)

    this.keyFullList = [
      {id: 'created_at', name: 'Date', comparators: ['gt', 'lt']},
      {id: 'text', name: 'Tweet', comparators: ['i_contains', 'i_not_contains']},
      {id: 'favorite_count', name: 'Number of likes', comparators: ['eq', 'neq', 'gt', 'lt']},
      {id: 'entities.user_mentions', name: 'Number of mentions', comparators: ['eq', 'neq', 'gt', 'lt']},
      {id: 'entities.hashtags', name: 'Number of hashtags', comparators: ['eq', 'neq', 'gt', 'lt']}
    ]

    this.comparatorFullList = [
      {id: 'eq', name: 'Equals'},
      {id: 'neq', name: 'Not equals'},
      {id: 'i_contains', name: 'Includes'},
      {id: 'i_not_contains', name: 'Not includes'},
      {id: 'gt', name: 'Greater than'},
      {id: 'lt', name: 'Less than'}
    ]

    this.state = {
      key: 'created_at',
      comparator: 'eq',
      value: null,
      comparatorList: this.comparatorFullList.slice(0)
    }

    this.onKeySelectorChange = this.onKeySelectorChange.bind(this)
    this.onComparatorSelectorChange = this.onComparatorSelectorChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  // Lifecycle 
  componentDidMount () {
    var event = new Event('change', { bubbles: true })
    document.querySelector('.execute-change-onmount').dispatchEvent(event)
  }

  onKeySelectorChange (event) {
    const key = event.target.value
    const validComparators = this.keyFullList.find((item) => {
      return item.id === key}).comparators
    const filteredList = this.comparatorFullList.filter((item) => {
      return validComparators.indexOf(item.id) !== -1})

    this.setState({key: key})
    this.setState({comparatorList: filteredList})
    this.setState({comparator: filteredList[0].id})
  }

  onComparatorSelectorChange (event) {
    this.setState({comparator: event.target.value})
  }

  onInputChange (event) {
    this.setState({value: event.target.value})
  }

  onFormSubmit (event) {
    event.preventDefault()

    this.props.addFilterAction({
      key: this.state.key,
      comparator: this.state.comparator,
      value: this.state.value,
      timestamp: new Date().getTime()
    })

    this.setState({ value: '' })
  }

  render () {
    return (
    <form className="filter-form form-inline" onSubmit={this.onFormSubmit}>
      <div className="form-group">
        <select className="form-control execute-change-onmount" value={this.state.key} onChange={this.onKeySelectorChange}>
          {this.keyFullList.map(function renderingKeys (key, i) {
             return (<option key={i} value={key.id}>
                       {key.name}
                     </option>)
           }, this)}
        </select>
        <select className="form-control" value={this.state.comparator} onChange={this.onComparatorSelectorChange}>
          {this.state.comparatorList.map(function renderingComparators (comparator, i) {
             return (<option key={i} value={comparator.id}>
                       {comparator.name}
                     </option>)
           }, this)}
        </select>
        <input
          type="text"
          required
          className="form-control"
          value={this.state.value}
          onChange={this.onInputChange} />
      </div>
      <button type="submit" className="btn btn-sm btn-secondary">
        <FaPlus />Add
      </button>
    </form>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addFilterAction: addFilterAction
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FilterForm)
