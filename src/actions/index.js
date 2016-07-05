import { FETCH_TWEETS_ACTION, FETCH_USERS_ACTION, SELECT_USER_ACTION, SHOW_LOADING_ACTION, ADD_TWEET_FILTER_ACTION, REMOVE_TWEET_FILTER_ACTION, APPLY_TWEET_FILTER_ACTION, CLEAR_ALL_TWEET_FILTER_ACTION } from './types'
import Codebird from '../../third-party-tools/codebird'
// import Codebird from 'codebird'

// A Twitter library in JavaScript. https://www.npmjs.com/package/codebird
// This library has been modified in order to fix problems with OAuth dynamic fields
const codeBird = new Codebird()
codeBird.setConsumerKey('jPs0eIaJXwZsEcLTfLit5AnU4', 'rV5gk58dL41L8HKVZFjAqjYr54nXcdzHvabRWOtncy5qwfVDpB') // codeBird.setConsumerKey("API Key", "API Secret")
codeBird.setToken('370190091-1WuJEBfGciKwKn3bg0ygWmNa0VhDUF2XiR5nYeQK', 'fIPVh2RUPINrmidNvjBpwuyos14cjT0IvYz1kRngTzaHm') // codeBird.setToken("	Access Token", "Access Token Secret")

// Users
export function fetchUsersAction (q, count = 7) {
  const request = new Promise(function promiseDefinition (resolve, reject) {
    codeBird.__call('users_search', `q=${window.encodeURIComponent(q)}&count=${count}`,
      function promiseDefinitionSuccess (reply, rate_limit_status) {
        resolve(reply)
      }
    )
  })

  return {
    type: FETCH_USERS_ACTION,
    payload: request
  }
}
export function selectUserAction (user) {
  return {
    type: SELECT_USER_ACTION,
    payload: user
  }
}

// Tweets
export function fetchTweetsAction (userId, count = 50) {
  const request = new Promise(function promiseDefinition (resolve, reject) {
    codeBird.__call('statuses_userTimeline', `user_id=${userId}`,
      function promiseDefinitionSuccess (reply, rate_limit_status) {
        resolve(reply)
      }
    )
  })

  return {
    type: FETCH_TWEETS_ACTION,
    payload: request
  }
}

// App
export function showLoadingStatus () {
  return {
    type: SHOW_LOADING_ACTION,
    payload: true
  }
}

// Filters
export function addFilterAction (filter) {
  return {
    type: ADD_TWEET_FILTER_ACTION,
    payload: filter
  }
}
export function removeFilterAction (filter) {
  return {
    type: REMOVE_TWEET_FILTER_ACTION,
    payload: filter
  }
}
export function applyFilterAction (filteredList) {
  return {
    type: APPLY_TWEET_FILTER_ACTION,
    payload: filteredList
  }
}
export function clearAllFilterAction () {
  return {
    type: CLEAR_ALL_TWEET_FILTER_ACTION,
    payload: []
  }
}
