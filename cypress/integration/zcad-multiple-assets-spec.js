describe('zcad-multiple-assets', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-multiple-assets.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-multiple-assets'
    cy.get('canvas').percySnapshot(test)
  })
})
