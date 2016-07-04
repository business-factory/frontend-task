import { expect } from '../test_helper'
import LoadingStatusReducer from '../../src/reducers/loading-status-reducer'
import { FETCH_TWEETS_ACTION, FETCH_USERS_ACTION, SHOW_LOADING_ACTION  } from '../../src/actions/types'

describe('Loading status reducer', () => {
  it('handles action of not equals to SHOW_LOADING', () => {
    expect(LoadingStatusReducer(undefined, FETCH_USERS_ACTION)).to.eql(false)
    expect(LoadingStatusReducer(undefined, FETCH_TWEETS_ACTION)).to.eql(false)
    expect(LoadingStatusReducer(undefined, {})).to.eql(false)
  })

  it('handles action of SHOW_LOADING', () => {
    expect(LoadingStatusReducer(true, SHOW_LOADING_ACTION)).to.eql(true)
  })
})
