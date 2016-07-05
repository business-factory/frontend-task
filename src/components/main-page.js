import React, { Component } from 'react'
import RoiHunterLogo from '../components/roihunter-logo'
import SearchBar from '../containers/search-bar'
import AppPanel from '../containers/app-panel'

export default class MainPage extends Component {
  render () {
    return (
    <div>
      <div className='container'>
        <div className='header-content'>
          <RoiHunterLogo link="/home" />
          <SearchBar />
        </div>
      </div>
      <AppPanel />
    </div>
    )
  }
}
