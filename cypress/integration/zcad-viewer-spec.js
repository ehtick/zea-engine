describe('zcad-viewer-Dead_eye_bearing', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-viewer.html?zcad=data/zcad/3.9.1/Dead_eye_bearing.stp.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-viewer'
    cy.get('canvas').percySnapshot(test)
  })
})
describe('zcad-viewer-gear_box_final_asm', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-viewer.html?zcad=data/zcad/3.9.1/gear_box_final_asm.stp.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-viewer-gear_box_final_asm'
    cy.get('canvas').percySnapshot('zcad-viewer-gear_box_final_asm')
  })
})
describe('zcad-viewer-Autruche', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-viewer.html?zcad=data/zcad/3.9.1/Autruche.stp.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-viewer-Autruche'
    cy.get('canvas').percySnapshot('zcad-viewer-Autruche')
  })
})

describe('zcad-viewer-HC_SRO4', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-viewer.html?zcad=data/zcad/3.9.1/HC_SRO4.step.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-viewer-HC_SRO4'
    cy.get('canvas').percySnapshot('zcad-viewer-HC_SRO4')
  })
})

describe('zcad-viewer-PressRink', () => {
  it('Capture snapshots', () => {
    cy.visit(`testing-e2e/zcad-viewer.html?zcad=data/zcad/3.9.1/PressRink.CATProduct.zcad`)

    cy.get('#status').should('have.text', `done-loading`)
    const test = 'zcad-viewer-PressRink'
    cy.get('canvas').percySnapshot('zcad-viewer-PressRink')
  })
})
