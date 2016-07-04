import { FETCH_TWEETS_ACTION, SELECT_USER_ACTION, APPLY_TWEET_FILTER_ACTION } from '../actions/types'

const INITIAL_STATE = []

export default function tweetsReducerDefinition (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TWEETS_ACTION:
      return action.payload
    case SELECT_USER_ACTION:
      return INITIAL_STATE
    case APPLY_TWEET_FILTER_ACTION:
      return action.payload
    default:
      break
  }

  return state
}
