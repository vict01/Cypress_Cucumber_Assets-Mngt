/// <reference types="cypress" />
// ***********************************************************
//
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
//
// You can read doc. here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
}

const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
    on('file:preprocessor', cucumber())
}