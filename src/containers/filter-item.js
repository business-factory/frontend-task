import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeFilterAction } from '../actions/index'

class FilterItem extends Component {
  constructor (props) {
    super(props)
    // this.state = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit (event) {
    event.preventDefault()
    this.props.removeFilterAction(this.state)
  }

  render () {
    return (
      <div>FilterItem</div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    removeFilterAction: removeFilterAction
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FilterItem)
