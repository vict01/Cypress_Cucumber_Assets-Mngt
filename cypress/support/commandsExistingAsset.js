/// <reference types="cypress" />
import { appData } from "../fixtures/fixture.json"
let counter

Cypress.Commands.add('setCounter', () => {
    cy.getAssets().then(el => {
        if (el.length)
            counter = el.length
        else
            counter = 1

        Cypress.env('varCounter', counter);
        cy.log(`The counter set is: ${counter}`)
    })
})

Cypress.Commands.add('clickOnExistingAssetsTab', () => {
    cy.interceptGetAssets()
    cy.get('.item').last().click()
    cy.waitGetAssets()
})

Cypress.Commands.add('clickOnSortTable', () => {
    cy.get('.sorting').click()
})

Cypress.Commands.add('sortTableAsc', () => {
    cy.get('.sorting_asc').click()
})

Cypress.Commands.add('getTableData', () => {
    cy.get('[data-test="table-body"]').find('tr').as('table')

    cy.get('@table').then(row => {
        let arr = Object.keys(row)
        return arr.map(element => { return row[element].textContent })
            .filter(element => element)
    })
})

Cypress.Commands.add('doAsearch', (text) => {
    cy.get('[data-test="datatable-input"]').clear().type(text)
})

Cypress.Commands.add('setShowEntry', (entry) => {
    cy.get('.custom-select').select(entry)
})