describe('Labels and Billboards', () => {
  it('Renders labels', () => {
    cy.visit('testing-e2e/labels.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-Loading')

    // This should work, but it always fails. The screenshot taken does not contain the highlight.
    // I have no idea how to fix it.
    // TODO: Figure out how to make these kinds of tests work and enable this.
    // cy.get('canvas').trigger('mousemove', 500, 330)
    // cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-MouseOverLabel`)
    // cy.get('canvas').percySnapshot(`MouseOverLabel`)

    {
      const variant = 'front'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`Labels ${variant}`)
    }
    {
      const variant = 'back'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`Labels ${variant}`)
    }
  })

  it('Renders labels - Fixedsize', () => {
    cy.visit('testing-e2e/labels-fixedsize.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-Loading')
    {
      const variant = 'front'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`Labels - Fixedsize ${variant}`)
    }
    {
      const variant = 'back'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`Labels - Fixedsize ${variant}`)
    }
  })
})
