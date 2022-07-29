describe('zcad-changing-face-materials', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/zcad-changing-face-materials.html`)

    cy.get('#status').should('have.text', `done-loading`)

    const test = 'zcad-changing-face-materials'
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
