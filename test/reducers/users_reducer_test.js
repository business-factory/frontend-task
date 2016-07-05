import { expect } from '../test_helper'
import UsersReducer from '../../src/reducers/users-reducer'
import { FETCH_USERS_ACTION } from '../../src/actions/types'

describe('Users reducer', () => {
  it('handles action with unknow types', () => {
    expect(UsersReducer(undefined, {})).to.eql([])
  })

  it('handles action of FETCH_USERS', () => {
    expect(UsersReducer([1], FETCH_USERS_ACTION)).to.be.instanceOf(Array)
    expect(UsersReducer([1], FETCH_USERS_ACTION)).to.not.eql([])
  })
})
