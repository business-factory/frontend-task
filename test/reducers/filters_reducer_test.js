import { expect } from '../test_helper'
import FiltersReducer from '../../src/reducers/filters-reducer'
import { ADD_TWEET_FILTER_ACTION, REMOVE_TWEET_FILTER_ACTION, CLEAR_ALL_TWEET_FILTER_ACTION }  from '../../src/actions/types'

describe('Filter tweets status reducer', () => {
  it('handles action of ADD_TWEET_FILTER', () => {
    expect(FiltersReducer(undefined, ADD_TWEET_FILTER_ACTION)).to.be.instanceOf(Array)
  })
  
  it('handles action of REMOVE_TWEET_FILTER', () => {
    expect(FiltersReducer(undefined, REMOVE_TWEET_FILTER_ACTION)).to.be.instanceOf(Array)
  })

  it('handles action of CLEAR_ALL_TWEET_FILTER', () => {
    expect(FiltersReducer(undefined, CLEAR_ALL_TWEET_FILTER_ACTION)).to.be.instanceOf(Array)
  })
})
