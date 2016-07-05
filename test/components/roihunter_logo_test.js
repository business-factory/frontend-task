import { renderComponent, expect } from '../test_helper'
import RoiHunterLogo from '../../src/components/roihunter-logo'

describe('RoiHunterLogo', () => {
  let component

  beforeEach(()=>{
    component = renderComponent(RoiHunterLogo)
  })

  it('has an img tag', () => {
    expect(component.find('img')).to.exist
  })

  it('has the correct class', () => {
    expect(component).to.have.class('logo')
  })
})
