import { expect } from '../test_helper'
import SelectedUserReducer from '../../src/reducers/selected-user-reducer'
import { SELECT_USER_ACTION } from '../../src/actions/types'

describe('Select user reducer', () => {
  it('handles action with unknow types', () => {
    expect(SelectedUserReducer(undefined, {})).to.eql(null)
  })

  it('handles action of SELECT_USER', () => {
    expect(SelectedUserReducer({'a': 1}, SELECT_USER_ACTION)).to.be.instanceOf(Object)
    expect(SelectedUserReducer({'a': 1}, SELECT_USER_ACTION)).to.not.eql(null)
  })
})
