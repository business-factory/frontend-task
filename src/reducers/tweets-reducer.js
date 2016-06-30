import { FETCH_TWEETS_ACTION } from '../actions/index'

export default function tweetsReducerDefinition (state = [], action) {
  switch (action.type) {
    case FETCH_TWEETS_ACTION:
      return action.payload
    default:
      break
  }

  return state
}
