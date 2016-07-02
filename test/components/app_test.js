import { renderComponent, expect } from '../test_helper'
import App from '../../src/components/app'

// Use 'describe' to group together similar tests
describe('App', () => {
  // Use 'it' to test a single attribute of a target
  it('shows the correct text', () => {
    const component = renderComponent(App)
    
    // Use 'expect' To make a single 'assertion' about a target
    expect(component).to.contain('abc')
  })
})
