describe('geomitem-geom-buffer-visiblity', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/geomitem-geom-buffer-visiblity.html')

    cy.get('#status').should('have.text', `done-loading`)
    cy.get('canvas').percySnapshot('geomitem-geom-buffer-visiblity')

    it('Mouse Enter - Geometry', () => {
      cyFocusCanvas()

      cy.get('canvas').trigger('mousemove', 528, 430)

      cy.get('canvas').percySnapshot(`MouseEnterGeometry`)
    })

    it('Mouse Leave - Geometry', () => {
      cyFocusCanvas()

      cy.get('canvas').trigger('mousemove', 465, 454)

      cy.get('canvas').percySnapshot(`MouseLeaveGeometry`)
    })
  })
})
