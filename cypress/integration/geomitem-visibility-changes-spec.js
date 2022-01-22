describe('geomitem-visibility-changes', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/geomitem-visibility-changes.html`)

    cy.get('#status').should('have.text', `done-loading`)

    const test = 'geomitem-visibility-changes'
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

    {
      const variant = 'variant-03'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
