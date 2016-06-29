import { FETCH_USERS_ACTION } from '../actions/index'

export default function usersReducerDefinition (state = [], action) {
  switch (action.type) {
    case FETCH_USERS_ACTION:
      return action.payload.data
    default:
      break
  }

  return state
}
