describe('zcad-xrefs', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-xrefs.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-xrefs'
    cy.get('canvas').percySnapshot(test)

    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
