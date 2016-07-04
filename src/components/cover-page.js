import React, { Component } from 'react'
import RoiHunterLogoLarge from '../components/roihunter-logo-large'
import SearchBar from '../containers/search-bar'
import { browserHistory } from 'react-router'

export default class CoverPage extends Component {
  // Lifecycle
  componentWillMount () {
    document.addEventListener('click', this.onCoverPageClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onCoverPageClick, false)
  }

  onCoverPageClick (event) {
    const parentLimit = document.querySelector('.cover-page')
    const elementStr = 'li.search-result-list-item'
    const foundLi = findClosestParentElement(event.target, elementStr, parentLimit)

    if (foundLi) {
      window.setTimeout(() => {
        browserHistory.push('/main')
      }, 800)
    }
  }

  render () {
    return (
    <div className="cover-page">
      <RoiHunterLogoLarge />
      <p>Twitter performance manager</p>
      <SearchBar />
      <small>Search for any Twitter account using @username or type it directly</small>
    </div>
    )
  }
}

function findClosestParentElement (el, elementStr, parentLimit) {
  var tagName = elementStr
  var tagClass

  if (elementStr.indexOf('.') !== -1) {
    tagName = elementStr.split('.')[0]
    tagClass = elementStr.split('.')[1]
  }

  while (el.parentNode) {
    if (String(el.tagName).toLowerCase() === tagName) {
      if (!tagClass) {
        return el
      }

      if (el.classList.contains(tagClass)) {
        return el
      }
    }

    if (el == parentLimit) {
      return null
    }

    el = el.parentNode
  }

  return null
}
