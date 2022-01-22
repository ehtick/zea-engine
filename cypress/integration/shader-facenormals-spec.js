describe('shader-facenormals', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/shader-facenormals.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'shader-facenormals'
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
