describe('material-group', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/material-group.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('material-group')

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`material-group - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-02'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`material-group - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-03'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`material-group - ${variant}`)
    })
  })
})
