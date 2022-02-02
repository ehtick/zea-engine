describe('occlusion-culling-tiny-objects', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/occlusion-culling-tiny-objects.html')

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('occlusion-culling-tiny-objects')

    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }
  })
})
