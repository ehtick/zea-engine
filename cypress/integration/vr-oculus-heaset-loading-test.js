describe('vr-oculus-heaset-loading-test', () => {
  it('Captures snapshots of variants', () => {
    cy.visit(`testing-e2e/vr-oculus-heaset-loading-test.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'vr-oculus-heaset-loading-test'

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