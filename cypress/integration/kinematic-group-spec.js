describe('kinematic-group', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/kinematic-group.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'kinematic-group'
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
