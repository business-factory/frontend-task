import { renderComponent, expect } from '../test_helper'
import { 
  fetchUsersAction, fetchTweetsAction, selectUserAction, showLoadingStatus, addFilterAction, removeFilterAction, applyFilterAction, clearAllFilterAction 
} from '../../src/actions'
import { 
  FETCH_USERS_ACTION, FETCH_TWEETS_ACTION, SELECT_USER_ACTION, SHOW_LOADING_ACTION, ADD_TWEET_FILTER_ACTION, REMOVE_TWEET_FILTER_ACTION, APPLY_TWEET_FILTER_ACTION, CLEAR_ALL_TWEET_FILTER_ACTION 
} from '../../src/actions/types'

describe('Action creators', () => {
  describe('Users actions', () => {
    it('Fetch users has the correct type', () => {
      const action = fetchUsersAction('@BillGates')
      expect(action.type).to.equal(FETCH_USERS_ACTION)
      expect(action.payload).to.be.instanceOf(Promise)
    })
    
    it('Select user has the correct type', () => {
      const action = selectUserAction({})
      expect(action.type).to.equal(SELECT_USER_ACTION)
    })
  })

  describe('Tweets actions', () => {
    it('Fetch tweets action has the correct type', () => {
      const action = fetchTweetsAction(50393960)
      expect(action.type).to.equal(FETCH_TWEETS_ACTION)
      expect(action.payload).to.be.instanceOf(Promise)
    })
  })
  
  describe('App actions', () => {
    it('Set loading status has the correct type', () => {
      const action = showLoadingStatus()
      expect(action.type).to.equal(SHOW_LOADING_ACTION)
      expect(action.payload).to.eql(true)
    })
  })

  describe('Filters actions', () => {
    it('Add filter action has the correct type', () => {
      const action = addFilterAction()
      expect(action.type).to.equal(ADD_TWEET_FILTER_ACTION)
    })
    
    it('Remove filter action has the correct type', () => {
      const action = removeFilterAction()
      expect(action.type).to.equal(REMOVE_TWEET_FILTER_ACTION)
    })

    it('Apply filter action has the correct type', () => {
      const action = applyFilterAction()
      expect(action.type).to.equal(APPLY_TWEET_FILTER_ACTION)
    })
    
    it('Apply filter action has the correct type', () => {
      const action = clearAllFilterAction()
      expect(action.type).to.equal(CLEAR_ALL_TWEET_FILTER_ACTION)
      expect(action.payload).to.eql([]) 
    })
  })
})
