import axios from 'axios'

// Action types
export const FETCH_TWEETS_ACTION = 'FETCH_TWEETS'
export const FETCH_USERS_ACTION = 'FETCH_USERS'
export const SELECT_USER_ACTION = 'SELECT_USER'

export function selectUserAction(user) {
  return {
    type: SELECT_USER_ACTION,
    payload: user
  }
}

export function fetchUsersAction(q, count = 5, include_entities = false) {
  // const request = axios.get('../../static-json-response/users-search-zuckemberg.json')
  const request = axios.get('../../static-json-response/users-search-shakira.json')

  return {
    type: FETCH_USERS_ACTION,
    payload: request
  }
}

export function fetchTweetsAction (userId, count = 50) {
  const request = axios.get(`../../static-json-response/user-timeline-${userId}.json`)
  
  return {
    type: FETCH_TWEETS_ACTION,
    payload: request
  }
}