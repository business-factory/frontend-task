import { renderComponent, expect } from '../test_helper'
import RoiHunterLogoLarge from '../../src/components/roihunter-logo-large'

describe('RoiHunterLogoLarge', () => {
  let component

  beforeEach(()=>{
    component = renderComponent(RoiHunterLogoLarge)
  })

  it('has an img tag', () => {
    expect(component.find('img')).to.exist
  })

  it('has the correct class', () => {
    expect(component).to.have.class('logo')
  })
})
