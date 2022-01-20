const test = 'cone'
describe(test, () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/${test}.html`)

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
