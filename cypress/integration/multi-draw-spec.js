describe('multi_draw', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/multi-draw.html`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('multi_draw')

    /* Eliminating redundant tests while our limit is 5k images per month
    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    */
  })
})
describe('multi_draw-webgl1', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/multi-draw.html?webgl=webgl`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('multi_draw-webgl')

    /* Eliminating redundant tests while our limit is 5k images per month
    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    */
  })
})

describe('multi_draw-disable-multidraw', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/multi-draw.html?disableMultiDraw`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('multi_draw-disableMultiDraw')

    /* Eliminating redundant tests while our limit is 5k images per month
    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    */
  })
})
