describe('frustum-culling-cadasset', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/frustum-culling-cadasset.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'frustum-culling-cadasset'
    cy.get('canvas').percySnapshot(test)

    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
