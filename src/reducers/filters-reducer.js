import { ADD_TWEET_FILTER_ACTION, REMOVE_TWEET_FILTER_ACTION, CLEAR_ALL_TWEET_FILTER_ACTION } from '../actions/types'

const INITIAL_STATE = []

export default function filtersReducerDefinition (state = INITIAL_STATE , action) {
  switch (action.type) {
    case ADD_TWEET_FILTER_ACTION:
      return [...state, action.payload]
    case REMOVE_TWEET_FILTER_ACTION:
      const indexItem = state.indexOf(action.payload)
      return [
        ...state.slice(0, indexItem),
        ...state.slice(indexItem + 1)
      ]
    case CLEAR_ALL_TWEET_FILTER_ACTION:
      return INITIAL_STATE
    default:
      break
  }

  return state
}
