import { renderComponent, expect } from '../test_helper'
import MainPage from '../../src/components/main-page'

describe('MainPage', () => {
  let component

  beforeEach(()=>{
    component = renderComponent(MainPage)
  })

  it('should contains a figure tag with logo', () => {
    expect(component.find('figure')).to.exist
  })
  
  it('should contains a form with search input', () => {
    expect(component.find('form input#search-query')).to.exist
  })
})
