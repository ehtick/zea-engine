// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Integrating Percy with Cypress.
// See:
// https://docs.percy.io/docs/cypress
import '@percy/cypress'

// This addresses a bug in Cypress.
// See:
// https://stackoverflow.com/a/63519375/320791
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    // returning false here prevents Cypress from
    // failing the test
    return false
  }

  return true
})
