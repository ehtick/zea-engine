describe('engine-cad-ux-Dead_eye_bearing', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux'
    cy.get('canvas').percySnapshot(test)
  })
})
describe('engine-cad-ux-gear_box_final_asm', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux.html?zcad=data/gear_box_final_asm.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux-gear_box_final_asm'
    cy.get('canvas').percySnapshot('engine-cad-ux-gear_box_final_asm')
  })
})

describe('engine-cad-ux-HC_SRO4', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux.html?zcad=data/HC_SRO4.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux-HC_SRO4'
    cy.get('canvas').percySnapshot('engine-cad-ux-HC_SRO4')
  })
})
