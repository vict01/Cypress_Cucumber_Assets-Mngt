/// <reference types="cypress" />
import { Given, When, And, Then, Before } from "cypress-cucumber-preprocessor/steps"
let counter, assetName

Before(() => {
    cy.visit('/')
})

Before({ tags: "@counterNeeded" }, () => {
    cy.log(`Getting assets amount to set the counter...`)
    if (counter === undefined || counter === null || isNaN(counter)) {
        cy.setCounter()
    }
})

Given('I go to the Add Asset tab', () => {
    cy.url().then(el => {
        if (el !== `${Cypress.config('baseUrl')}/add`)
            cy.clickOnAddAssetTab()
    })
})

When('Validate page title and url', () => {
    cy.title().should('eq', 'Technical assignment')
    cy.url().should('eq', `${Cypress.config('baseUrl')}/add`)
})

And(/^I type a valid name starting with ([^"]*) in the asset input box$/, (text) => {
    counter = Cypress.env('varCounter')
    cy.createAssetName(text, counter).then(element => {
        assetName = element
        cy.get('#defaultFormAddAsset').type(assetName)
            .invoke('val').then(el => {
                cy.log(`The text entered was: ${el}`)
                expect(el).to.eq(assetName)
            })

        cy.interceptAddAssets(assetName)
    })
})

And('I type an existing name in the asset input box', () => {
    cy.getTheFirstAssets().then(assetName => {
        cy.log("This is the first: ", assetName)

        cy.get('#defaultFormAddAsset').type(assetName).invoke('val').then(el => {
            cy.log(`The text entered was: ${el}`)
            expect(el).to.eq(assetName)
        })

        cy.interceptAddAssets(assetName)
    })
})

And('I type an invalid name in the asset input box', (text) => {
    assetName = text.rows().toString()
    cy.get('#defaultFormAddAsset').type(assetName).invoke('val').then(el => {
        cy.log(`The text entered was: ${el}`)
        expect(el).to.eq(assetName)
    })
})

And('I press send button', () => {
    cy.clickOnSendButton()
})

And('Validate the asset was added successfully', () => {
    cy.wait('@assetAdded').then((interception) => {
        let resp = interception.response
        expect(resp.body).includes("Ok")
        expect(resp.statusCode).to.eq(201)
    })

    cy.get('@assetAdded').its('request.url').should('include', assetName)
    cy.get('[data-test="modal-body"]')
        .should('have.text', `Asset ${assetName} was added to the list`)

    // cy.get('.modal-title').should('have.text', 'Success') // typo Bug, it says "Sucssess"
    cy.get('.valid-feedback').should('be.visible')
})

Then('I close notification message about the result adding asset', () => {
    cy.closePopUpAssetAdded()
})

Then('Validate the asset is not added due to unmatching format', () => {
    cy.get('.modal-title').should('not.exist')
    cy.get('[data-test="modal-body"]').should('not.exist')
    cy.get('.valid-feedback').should('not.be.visible')
})

And('Validate the asset is not added because of the name already exists', () => {
    cy.wait('@assetAdded').then((interception) => {
        // expect(interception.response.body).to.eq('Value exists') // typo Bug, it says "exisits"
        expect(interception.response.body).to.not.eq('Ok')
        expect(interception.response.statusCode).to.eq(409)
    })

    cy.get('[data-test="modal-body"]')
        .should('have.text', `Asset name should be unique. Assert with this name already exists`)
        // cy.get('.valid-feedback').should('not.be.visible') // Bug, appears anyway
        // cy.get('.modal-title').should('have.text', 'Asset already exist') // typo Bug, it says "alredy"
})

Then('Validate the asset is not added due to empty asset name field', () => {
    cy.get('.modal-title').should('not.exist')
    cy.get('[data-test="modal-body"]').should('not.exist')
    cy.get('.valid-feedback').should('not.be.visible')
})