describe('occlusion-culling-occluded-by-hidden-bbox', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/occlusion-culling-occluded-by-hidden-bbox.html')

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('occlusion-culling-occluded-by-hidden-bbox')

    // This variant doesn't ever seem to complete in Cypress. Something gets stuck in the web worker.
    // which never emits the correct event to say culling completed.
    // {
    //   const variant = 'variant-01'
    //   cy.get(`#${variant}`).click()
    //   cy.get('#status').should('have.text', `done-${variant}`)
    //   // cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    // }
    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
    {
      const variant = 'variant-03'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
    {
      const variant = 'variant-04'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
  })
})
