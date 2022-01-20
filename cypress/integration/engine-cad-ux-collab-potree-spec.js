describe('engine-cad-ux-collab-potree-Dead_eye_bearing', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux-collab-potree.html`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux-collab-potree'
    cy.get('canvas').percySnapshot(test)
  })
})
describe('engine-cad-ux-collab-potree-gear_box_final_asm', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux-collab-potree.html?zcad=data/gear_box_final_asm.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux-collab-potree-gear_box_final_asm'
    cy.get('canvas').percySnapshot('engine-cad-ux-collab-potree-gear_box_final_asm')
  })
})

describe('engine-cad-ux-collab-potree-HC_SRO4', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/engine-cad-ux-collab-potree.html?zcad=data/HC_SRO4.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'engine-cad-ux-collab-potree-HC_SRO4'
    cy.get('canvas').percySnapshot('engine-cad-ux-collab-potree-HC_SRO4')
  })
})
