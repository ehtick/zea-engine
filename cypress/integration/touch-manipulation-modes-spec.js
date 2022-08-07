import { createTouchEvents, cyFocusCanvas } from './utils'

const test = 'touch-manipulation-modes'
describe(test, () => {
  beforeEach(() => {
    cy.visit('testing-e2e/touch-manipulation-modes.html')
  })

  {
    const variant = 'Touch - persp - rotate'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#rotate`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }
  {
    const variant = 'Touch - persp - pan'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#pan`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }

  {
    const variant = 'Touch - persp - zoom'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#zoom`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }

  {
    const variant = 'Touch - persp - rotate'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#ortho`).click()
      cy.get(`#rotate`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }
  {
    const variant = 'Touch - persp - pan'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#ortho`).click()
      cy.get(`#pan`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }
  {
    const variant = 'Touch - persp - zoom'
    it(variant, () => {
      const eTouchStart = createTouchEvents([300, 600])
      const eTouch = createTouchEvents([600, 600])

      cy.get(`#ortho`).click()
      cy.get(`#zoom`).click()
      cy.get('canvas').trigger('touchstart', eTouchStart).trigger('touchmove', eTouch).trigger('touchend', eTouch)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    })
  }
})
