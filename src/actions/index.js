import axios from 'axios'

// Action types
export const FETCH_TWEETS_ACTION = 'FETCH_TWEETS'
export const FETCH_USERS_ACTION = 'FETCH_USERS'
export const SELECT_USER_ACTION = 'SELECT_USER'

export function selectUserDispach (user) {
  console.log('selectUserDispach')
  return {
    type: SELECT_USER_ACTION,
    payload: user
  }
}

export function fetchUsersDispach (q, count = 5 , include_entities = false) {
  const request = axios.get('../../static-json-response/users-search-zuckemberg.json')

  // The redux-promise will stop this action and creates a new one when promise resolves
  return {
    type: FETCH_USERS_ACTION,
    payload: request
  }
}

// export function fetchTweetsAction () {
//   const request = axios.get('../../static-json-response/users-search-zuckemberg.json')

//   // The redux-promise will stop this action and creates a new one when promise resolves
//   return {
//     type: FETCH_TWEETS_ACTION,
//     payload: request
//   }
// }