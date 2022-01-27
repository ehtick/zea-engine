describe('zcad-shared-context', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/${test}.html`)
    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot(test)
  })
})
