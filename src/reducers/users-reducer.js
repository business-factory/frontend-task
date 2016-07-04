import { FETCH_USERS_ACTION } from '../actions/types'

const INITIAL_STATE = []

export default function usersReducerDefinition (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS_ACTION:
      return action.payload
    default:
      break
  }

  return state
}
