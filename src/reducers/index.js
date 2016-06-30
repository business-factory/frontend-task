import { combineReducers } from 'redux'
import TweetsReducer from './tweets-reducer'
import UsersReducer from './users-reducer'
import SelectedUserReducer from './selected-user-reducer'
import LoadingStatusReducer from './loading-status-reducer'
import FiltersReducer from './filters-reducer'

// Setting global state
const rootReducer = combineReducers({
  tweets: TweetsReducer,
  users: UsersReducer,
  selected_user: SelectedUserReducer,
  loading_status: LoadingStatusReducer,
  filters: FiltersReducer
})

export default rootReducer
