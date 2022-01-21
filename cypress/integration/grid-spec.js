describe('Zea Engine', () => {
  it('Renders a grid', () => {
    cy.visit('testing-e2e/grid.html')

    cy.get('#status').should('have.text', `done-loading`)

    cy.get('canvas').percySnapshot('Grid')
  })
})
