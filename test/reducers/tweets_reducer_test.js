import { expect } from '../test_helper'
import TweetsReducer from '../../src/reducers/users-reducer'
import { FETCH_TWEETS_ACTION, SELECT_USER_ACTION, APPLY_TWEET_FILTER_ACTION } from '../../src/actions/types'

describe('Tweets reducer', () => {
  it('handles action with unknow types', () => {
    expect(TweetsReducer(undefined, {})).to.eql([])
  })

  it('handles action of FETCH_TWEETS', () => {
    expect(TweetsReducer(['a'], FETCH_TWEETS_ACTION)).to.be.instanceOf(Array)
    expect(TweetsReducer(['a'], FETCH_TWEETS_ACTION)).to.not.eql([])
  })

  it('handles action of SELECT_USER', () => {
    expect(TweetsReducer(undefined, SELECT_USER_ACTION)).to.eql([])
  })
  
  it('handles action of APPLY_TWEET_FILTER_ACTION', () => {
    expect(TweetsReducer(['a'], APPLY_TWEET_FILTER_ACTION)).to.be.instanceOf(Array)
    expect(TweetsReducer(['a'], APPLY_TWEET_FILTER_ACTION)).to.not.eql([])
  })
})
