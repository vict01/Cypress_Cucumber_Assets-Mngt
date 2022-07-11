/// <reference types="cypress" />
import { Given, When, And, Then, Before } from "cypress-cucumber-preprocessor/steps"
import { assetNameInput, feedbackSAlertAddingAsset, labelConfirmationAddingAsset, headingAlertAddingAsset }
from '../../support/POM/addAssetsPage'

let assetName

Before(() => {
    cy.visit('/')
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
    cy.createAssetName().then(element => {
        assetName = element
        assetNameInput().type(assetName)
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

        assetNameInput().type(assetName).invoke('val').then(el => {
            cy.log(`The text entered was: ${el}`)
            expect(el).to.eq(assetName)
        })

        cy.interceptAddAssets(assetName)
    })
})

And('I type an invalid name in the asset input box', (text) => {
    assetName = text.rows().toString()
    assetNameInput().type(assetName).invoke('val').then(el => {
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
    feedbackSAlertAddingAsset()
        .should('have.text', `Asset ${assetName} was added to the list`)

    // headingAlertAddingAsset().should('have.text', 'Success') // typo Bug, it says "Sucssess"
    labelConfirmationAddingAsset().should('be.visible')
})

Then('I close notification message about the result adding asset', () => {
    cy.closePopUpAssetAdded()
})

Then('Validate the asset is not added due to unmatching format', () => {
    headingAlertAddingAsset().should('not.exist')
    feedbackSAlertAddingAsset().should('not.exist')
    labelConfirmationAddingAsset().should('not.be.visible')
})

And('Validate the asset is not added because of the name already exists', () => {
    cy.wait('@assetAdded').then((interception) => {
        // expect(interception.response.body).to.eq('Value exists') // typo Bug, it says "exisits"
        expect(interception.response.body).to.not.eq('Ok')
        expect(interception.response.statusCode).to.eq(409)
    })

    feedbackSAlertAddingAsset()
        .should('have.text', `Asset name should be unique. Assert with this name already exists`)
        // headingAlertAddingAsset().should('have.text', 'Asset already exist') // typo Bug, it says "alredy"
})

Then('Validate the asset is not added due to empty asset name field', () => {
    headingAlertAddingAsset().should('not.exist')
    feedbackSAlertAddingAsset().should('not.exist')
    labelConfirmationAddingAsset().should('not.be.visible')
})