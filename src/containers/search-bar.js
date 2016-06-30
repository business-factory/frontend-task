import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormGroup, FormControl } from 'react-bootstrap'

import { fetchUsersAction } from '../actions/index'
import SearchResultList from './search-result-list'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      showList: true
    }

    // Hard binding
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputFocus = this.onInputFocus.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
  }
  // Lifecycle events
  componentWillMount () {
    document.addEventListener('click', this.onDocumentClick , false)
  }
  
  componentWillUnmount  () {
    document.removeEventListener('click', this.onDocumentClick , false)
  }

  onDocumentClick (event) {
    if (String(event.target.tagName).toLowerCase() === 'input' && event.target.id === 'search-query') {
      return
    }
    
    this.setState({ showList: false })
  }

  onInputChange(event) {
    this.setState({ value: event.target.value })
  }

  onInputFocus(event) {
    this.setState({ showList: true })
  }

  onFormSubmit(event) {
    event.preventDefault()

    this.props.fetchUsersAction(this.state.value)
    this.setState({
      value: '',
      showList: true
    })
  }

  render() {
    return (
      <div className={'pos-relative' + (this.state.showList ? ' open' : '') }>
        <form onSubmit={this.onFormSubmit}>
          <FormGroup controlId='search-query'>
            <FormControl
              type='text'
              placeholder='Search for users on Twitter'
              value={this.state.value}
              onChange={this.onInputChange}
              onFocus={this.onInputFocus} />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <SearchResultList />
      </div>
    )
  }
}

// Injecting fetchUsersAction() into SearchBar
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUsersAction: fetchUsersAction
  }, dispatch)
}

// Connecting our Component using 'react-redux' (connect)
export default connect(null, mapDispatchToProps)(SearchBar)
