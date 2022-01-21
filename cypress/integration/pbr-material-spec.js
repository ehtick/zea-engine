describe('pbr-material', () => {
  it.skip('Capture snapshots', () => {
    cy.visit('testing-e2e/pbr-material.html')

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('pbr-material')
  })
})
