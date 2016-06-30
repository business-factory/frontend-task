import React, { Component } from 'react'
// import { connect } from 'react-redux'

export default class TweetQueryFilter extends Component {
  constructor(props) {
    super(props)
    // this.state = {}
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  
  render() {
    const user = this.props.user
    
    if (!user) {
      return (
        <div className='text-xs-center cover-content'>
          <h3>Lorem Ipsum is not simply random text</h3>
        </div>
      )
    }
    
    return (
      <form className='tweet-query-filter'>tweet-query-filter</form>
    )
  }
}