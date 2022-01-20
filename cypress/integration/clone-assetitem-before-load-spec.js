const test = 'clone-assetitem-before-load'
describe(test, () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/${test}.html`, {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })
    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot(test)
  })
})
