describe('hidden-line-rendering', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('hidden-line-rendering')

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

describe('hidden-line-rendering-webgl1', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html?webgl=webgl`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'hidden-line-rendering'
    cy.get('canvas').percySnapshot(test)

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

describe('hidden-line-rendering-debugGeomShader', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html?debugGeomShader.`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'hidden-line-rendering-debugGeomShader'
    cy.get('canvas').percySnapshot(test)
  })
})
