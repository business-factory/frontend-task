import axios from 'axios'

// A Twitter library in JavaScript. https://www.npmjs.com/package/codebird
// This library has been modified in order to fix problems with OAuth dynamic fields
const codeBird = new Codebird()
codeBird.setConsumerKey("jPs0eIaJXwZsEcLTfLit5AnU4", "rV5gk58dL41L8HKVZFjAqjYr54nXcdzHvabRWOtncy5qwfVDpB") //codeBird.setConsumerKey("API Key", "API Secret");
codeBird.setToken("370190091-1WuJEBfGciKwKn3bg0ygWmNa0VhDUF2XiR5nYeQK", "fIPVh2RUPINrmidNvjBpwuyos14cjT0IvYz1kRngTzaHm")//codeBird.setToken("	Access Token", "Access Token Secret");
// codeBird.setConsumerKey("jLj3Fx4SqiB04O1oxUNuKsfjG", "XHE98nvcgP5eZ7SBPC9fYsFnp8h61l845K3hlUKDAQlKw7WRFt") //codeBird.setConsumerKey("API Key", "API Secret");
// codeBird.setToken("281114642-i1TC0P6Kg9hr4ToZUP6g2Bm26VzPJZlvjeUjsX3Y", "eMq6ym9N8F1GBAq9bfC0yCff6xSVc1ZumiwwUnvF7Ik3H")//codeBird.setToken("	Access Token", "Access Token Secret");

// Action types

export const FETCH_TWEETS_ACTION = 'FETCH_TWEETS'
export const FETCH_USERS_ACTION = 'FETCH_USERS'
export const SELECT_USER_ACTION = 'SELECT_USER'

// Actions

export function fetchUsersAction(q, count = 5) {
  const request = new Promise(function promiseDefinition(resolve, reject) {
    codeBird.__call("users_search", `q=${q}&count=${count}`,
      function promiseDefinitionSuccess(reply, rate_limit_status) {
        resolve(reply)
      }
    )
  })

  return {
    type: FETCH_USERS_ACTION,
    payload: request
  }
}

export function fetchTweetsAction(userId, count = 50) {
  const request = new Promise(function promiseDefinition(resolve, reject) {
    codeBird.__call("statuses_userTimeline", `user_id=${userId}`,
      function promiseDefinitionSuccess(reply, rate_limit_status) {
        resolve(reply)
      }
    )
  })

  return {
    type: FETCH_TWEETS_ACTION,
    payload: request
  }
}

export function selectUserAction(user) {
  return {
    type: SELECT_USER_ACTION,
    payload: user
  }
}
