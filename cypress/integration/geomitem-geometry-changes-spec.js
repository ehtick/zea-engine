describe('geomitem-geometry-changes', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/geomitem-geometry-changes.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'geomitem-geometry-changes'
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
