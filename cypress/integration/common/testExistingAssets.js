/// <reference types="cypress" />
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"
let counter, assetName

Given('I have created a new asset', () => {
    counter = Cypress.env('varCounter')
    cy.createAssetName('ISIN', counter).then(el => {
        cy.log(` The created name is: ${el}`)
        assetName = el
        cy.addAssets(assetName)
    })
})

Given('I will create the required assets up to {int}', (top) => {
    counter = Cypress.env('varCounter')
    let qty = counter >= top ? 0 : top - counter
    cy.log(`The required amount of asset to reach ${top} are ${qty}`)
    cy.addMultipleAssets(qty, counter)
})

When('I go to the Existing Assets tab', () => {
    cy.url().then(el => {
        if (el !== `${Cypress.config('baseUrl')}/assets`)
            cy.clickOnExistingAssetsTab()
    })
})

Then('I Sort by last assert name', () => {
    cy.clickOnSortTable()
    cy.sortTableAsc()
})

And('Verify the value is in the table', () => {
    cy.getTableData().then(arr => {
        expect(arr).includes(assetName)
    })
})

Then('I do a search by the asset name {string}', (text) => {
    cy.doAsearch(text)
})

Then('I do a search by the asset name', () => {
    cy.doAsearch(assetName)
})

Then('Verify there is no result in the table', () => {
    cy.findAllByText(/No matching records found/i).should('be.visible')

    cy.getTableData().then(arr => {
        cy.log(`The resul is: ${arr}`)
        expect(arr).includes('No matching records found')
    })
})

Given('I select the entry view in: {int}', (entry) => {
    entry = entry.toString()
    cy.setShowEntry(entry)
})

And('Verify the amount of assets in the table is: {int}', (entry) => {
    cy.getTableData().then(arr => {
        expect(arr.length).eq(entry)
    })
})