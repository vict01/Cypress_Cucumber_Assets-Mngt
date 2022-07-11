/// <reference types="cypress" />
import { existingAssetsTab, sortTableButton, sortTableAscButton, assetsTable, searchAssetsBar, showEntryDrop }
from './POM/existingAssetsPage'

Cypress.Commands.add('clickOnExistingAssetsTab', () => {
    cy.interceptGetAssets()
    existingAssetsTab().click()
    cy.waitGetAssets()
})

Cypress.Commands.add('clickOnSortTable', () => {
    sortTableButton().click()
})

Cypress.Commands.add('sortTableByLast', () => {
    sortTableButton().dblclick()
})

Cypress.Commands.add('sortTableAsc', () => {
    sortTableAscButton().click()
})

Cypress.Commands.add('getTableData', () => {
    assetsTable().find('tr').as('table')

    cy.get('@table').then(row => {
        let arr = Object.keys(row)
        return arr.map(element => { return row[element].textContent })
            .filter(element => element)
    })
})

Cypress.Commands.add('doAsearch', (text) => {
    searchAssetsBar().clear().type(text)
})

Cypress.Commands.add('setShowEntry', (entry) => {
    showEntryDrop().select(entry)
})