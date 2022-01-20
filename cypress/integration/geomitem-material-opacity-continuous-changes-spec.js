describe('geomitem-material-opacity-continuous-changes', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/geomitem-material-opacity-continuous-changes.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'geomitem-material-opacity-continuous-changes'
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
