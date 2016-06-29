import { SELECT_USER_ACTION } from '../actions/index'

export default function selectedUserReducerDefinition (state = [], action) {
  switch (action.type) {
    case SELECT_USER_ACTION:
      debugger
      return action.payload
    default:
      break
  }

  return state
}
