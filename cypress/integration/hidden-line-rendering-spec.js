describe('hidden-line-rendering', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'hidden-line-rendering'
    cy.get('canvas').percySnapshot(test)
  })
})

describe('hidden-line-rendering-webgl1', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html?webgl=webgl`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'hidden-line-rendering-webgl1'
    cy.get('canvas').percySnapshot(test)
  })
})

describe('hidden-line-rendering-debugGeomShader', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/hidden-line-rendering.html?debugGeomShader`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'hidden-line-rendering-debugGeomShader'
    cy.get('canvas').percySnapshot(test)
  })
})
