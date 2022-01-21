let test = 'cutaways'
describe(test, () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/cutaways.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'cutaways'
    cy.get('canvas').percySnapshot(test)

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
  })
})

describe('cutaways-debugGeomShader', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/cutaways.html?debugGeomShader`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('cutaways-debugGeomShader')
  })
})
