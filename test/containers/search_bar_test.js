import { renderComponent, expect } from '../test_helper'
import SearchBar from '../../src/containers/search-bar'

describe('SearchBar', () => {
  let component

  beforeEach(() => {
    component = renderComponent(SearchBar)
    component.find('form input#search-query').simulate('change', '@BillGates')
  })

  it('shows the text inside search field', () => {
    expect(component.find('form input#search-query')).to.have.value('@BillGates')
  })

  it('clear search field after form submit', () => {
    component.find('form').simulate('submit')
    expect(component.find('form input#search-query')).to.have.value('')
  })
})
