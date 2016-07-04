import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersAction, showLoadingStatus } from '../actions/index'
import { FormGroup, FormControl } from 'react-bootstrap'
import SearchResultList from './search-result-list'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      showList: false
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onInputFocus = this.onInputFocus.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.callFetchUsersAction = _.debounce(this.callFetchUsersAction, 500)
  }
  // Lifecycle
  componentWillMount () {
    document.addEventListener('click', this.onDocumentClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick, false)
  }
  
  callFetchUsersAction (query) {
    this.props.showLoadingStatus()
    this.props.fetchUsersAction(query)
  }

  onDocumentClick (event) {
    if (String(event.target.tagName).toLowerCase() === 'input' && event.target.id === 'search-query') {
      return
    }

    this.setState({ showList: false })
  }

  onInputChange (event) {
    this.setState({ value: event.target.value })
    this.callFetchUsersAction(this.state.value)
  }

  onInputFocus (event) {
    this.setState({ showList: true })
    this.setState({ value: '' })
  }

  onFormSubmit (event) {
    event.preventDefault()

    this.callFetchUsersAction(this.state.value)
    this.setState({
      value: '',
      showList: true
    })
  }

  render () {
    const isLoading = this.props.loading_status

    return (
    <div className={'search-bar' + (this.state.showList ? ' open' : '')}>
      <form onSubmit={this.onFormSubmit}>
        <FormGroup controlId='search-query'>
          <FormControl
            type="text"
            autoComplete="off"
            spellCheck="false"
            placeholder={isLoading ? 'Loading...' : 'Search for users on Twitter'}
            value={this.state.value}
            onChange={this.onInputChange}
            onFocus={this.onInputFocus} />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      <SearchResultList/>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loading_status: state.loading_status,
    selected_user: state.selected_user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUsersAction: fetchUsersAction,
    showLoadingStatus: showLoadingStatus
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
