import { ADD_FILTER_ACTION, REMOVE_FILTER_ACTION } from '../actions/index'

const INITIAL_STATE = []

export default function filtersReducerDefinition (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_FILTER_ACTION:
      console.log(state, action)
      return [...state, action.payload]
    case REMOVE_FILTER_ACTION:
      return action.payload
    default:
      break
  }

  return state
}
