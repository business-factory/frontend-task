import { FETCH_TWEETS_ACTION, FETCH_USERS_ACTION, SHOW_LOADING_ACTION  } from '../actions/types'

const INITIAL_STATE = false

export default function loadingStatusReducerDefinition(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_LOADING_ACTION:
      return action.payload
    case FETCH_TWEETS_ACTION:
    case FETCH_USERS_ACTION:
      return INITIAL_STATE
    default:
      break
  }

  return state
}
