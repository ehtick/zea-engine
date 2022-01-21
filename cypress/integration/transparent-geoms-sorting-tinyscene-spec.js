describe('transparent-geoms-sorting-tinyscene', () => {
  it('Renders as expected', () => {
    cy.visit('testing-e2e/transparent-geoms-sorting-tinyscene.html')
    const test = 'transparent-geoms-sorting-tinyscene'

    {
      const variant = 'front'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
    {
      const variant = 'back'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
