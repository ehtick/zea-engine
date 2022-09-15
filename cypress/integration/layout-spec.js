const test = 'layout'
describe(test, () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/layout.html`)

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot(test)

    {
      const variant = 'openSidePanel'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
