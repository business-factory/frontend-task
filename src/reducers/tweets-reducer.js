import { FETCH_TWEETS_ACTION, SELECT_USER_ACTION } from '../actions/index'
const INITIAL_STATE = []

export default function tweetsReducerDefinition (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TWEETS_ACTION:
      return action.payload
    case SELECT_USER_ACTION:
      return INITIAL_STATE
    default:
      break
  }

  return state
}
