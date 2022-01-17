describe('occlusion-culling-occluded-by-hidden-bbox', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/occlusion-culling-occluded-by-hidden-bbox.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('occlusion-culling-occluded-by-hidden-bbox')

    {
      const variant = 'variant-01'
      cy.get('#variant-01').click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
    {
      const variant = 'variant-02'
      cy.get('#variant-01').click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
    {
      const variant = 'variant-03'
      cy.get('#variant-01').click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
    {
      const variant = 'variant-04'
      cy.get('#variant-01').click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-occluded-by-hidden-bbox - ${variant}`)
    }
  })
})
