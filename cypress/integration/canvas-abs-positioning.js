describe('canvas-abs-positioning', () => {
  it('Can use a `canvas` with absolute positioning', () => {
    cy.visit('testing-e2e/canvas-abs-positioning.html')

    cy.get('canvas').percySnapshot('canvas-abs-positioning')
  })
})
