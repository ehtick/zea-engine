const test = 'lines-sphere'
describe(test, () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/${test}.html`)

    cy.get('canvas').percySnapshot(test)
  })
})
