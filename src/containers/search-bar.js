import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormGroup, FormControl } from 'react-bootstrap'

import { fetchUsersDispach } from '../actions/index'
import SearchResultList from './search-result-list'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      showList: true
    }

    // Hard binding / overhide functions
    this.onInputChange = this.onInputChange.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange (event) {
    this.setState({ value: event.target.value })
  }

  toggleVisibility (event) {
    // this.setState({showList: !this.state.showList })
  }

  onFormSubmit (event) {
    event.preventDefault()

    this.props.fetchUsersDispach(this.state.value)
    this.setState({
      value: '',
      showList: true
    })
  }

  render () {
    return (
    <div className={'pos-relative' + (this.state.showList ? ' open' : '')}>
      <form onSubmit={this.onFormSubmit}>
        <FormGroup controlId='search-query'>
          <FormControl
            type='text'
            placeholder='Search Twitter'
            value={this.state.value}
            onChange={this.onInputChange}
            onBlur={this.toggleVisibility}
            onFocus={this.toggleVisibility} />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      <SearchResultList />
    </div>
    )
  }
}

// Injecting fetchUsersDispach() into SearchBar
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUsersDispach: fetchUsersDispach
  }, dispatch)
}

// Connecting our Component using 'react-redux' (connect)
export default connect(null, mapDispatchToProps)(SearchBar)
