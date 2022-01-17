describe('add-remove-items-from-renderer', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/add-remove-items-from-renderer.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot(`add-remove-items-from-renderer`)

    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }

    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }

    {
      const variant = 'variant-03'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }

    {
      const variant = 'variant-04'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }

    {
      const variant = 'variant-05'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }

    {
      const variant = 'variant-06'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    }
  })
})
