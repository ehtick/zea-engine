describe('textured-mesh', () => {
  it.skip('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/textured-mesh.html')
    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('textured-mesh')
  })
})
