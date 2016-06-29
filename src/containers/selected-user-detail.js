import React, { Component } from 'react'
import { connect } from 'react-redux'

class SelectedUserDetail extends Component {
  // constructor (props) {
  //   super(props)
  // }
  // {this.props.selected_user}
  render () {
    debugger
    return (
    <div className='selected-user-detail'>
      {this.props.selected_user}
    </div>
    )
  }
}

// Getting global state.selected_user
function mapStateToProps (state) {
  return {selected_user: state.selected_user}
}


// Connecting our Component using 'react-redux' (connect)
export default connect(mapStateToProps)(SelectedUserDetail)
