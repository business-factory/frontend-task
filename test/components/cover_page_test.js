import { renderComponent, expect } from '../test_helper'
import CoverPage from '../../src/components/cover-page'

describe('CoverPage', () => {
  let component

  beforeEach(()=>{
    component = renderComponent(CoverPage)
  })

  it('should contains a figure tag with logo', () => {
    expect(component.find('figure')).to.exist
  })
  
  it('should contains a form with search input', () => {
    expect(component.find('form input#search-query')).to.exist
  })
})
