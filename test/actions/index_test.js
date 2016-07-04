import { renderComponent, expect } from '../test_helper'
import { fetchUsersAction, fetchTweetsAction } from '../../src/actions'
import { FETCH_USERS_ACTION, FETCH_TWEETS_ACTION } from '../../src/actions/types'

describe('Action creators', () => {
  describe('fetchUsersAction', () => {
    it('has the correct type', () => {
      const action = fetchUsersAction('@BillGates')
      expect(action.type).to.equal(FETCH_USERS_ACTION)
    })
  })

  describe('fetchTweetsAction', () => {
    it('has the correct type', () => {
      const action = fetchTweetsAction(50393960)
      expect(action.type).to.equal(FETCH_TWEETS_ACTION)
    })
  })
})
