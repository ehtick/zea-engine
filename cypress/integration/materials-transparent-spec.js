describe('materials-transparent', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/materials-transparent.html`, {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('#status').should('have.text', `done-loading`)

    const test = 'materials-transparent'
    cy.get('canvas').percySnapshot(test)
    {
      const variant = 'variant-01'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }

    {
      const variant = 'variant-02'
      cy.get(`#${variant}`).click()
      cy.get('#status').should('have.text', `done-${variant}`)
      cy.get('canvas').percySnapshot(`${test} - ${variant}`)
    }
  })
})
