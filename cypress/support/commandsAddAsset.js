/// <reference types="cypress" />
import { appData } from "../fixtures/fixture.json"

Cypress.Commands.add('clickOnAddAssetTab', () => {
    cy.get('[testid="add-asset"]').click()
})

Cypress.Commands.add('clickOnSendButton', () => {
    cy.get('[data-test="button"]').click()
})

Cypress.Commands.add('closePopUpAssetAdded', () => {
    cy.get('[data-test="modal-footer"] > [data-test="button"]').click()
})

Cypress.Commands.add('interceptGetAssets', () => {
    cy.intercept('/getAssets').as('getAssets')
})

Cypress.Commands.add('waitGetAssets', () => {
    cy.wait('@getAssets').then(interception => {
        expect(interception.response.statusCode).eq(200)
    })
})

Cypress.Commands.add('getAssets', () => {
    cy.request(appData.getAssetsUrl)
        .then((resp) => {
            if (resp.body.length) {
                let assetsArray = resp.body
                return assetsArray
            } else {
                return false
            }
        })
})

Cypress.Commands.add('createAssetName', (literalPart, counter) => {
    let numericalPart = counter.toString()
    numericalPart = numericalPart.padStart(10, '0');
    let assetName = literalPart + numericalPart

    cy.getAssets()
        .then(arr => {
            if (arr.length) {
                while (arr.includes(assetName)) {
                    counter = counter + 1
                    numericalPart = counter.toString()
                    numericalPart = numericalPart.padStart(10, '0');
                    assetName = literalPart + numericalPart
                }
            }
            return assetName
        })
})

Cypress.Commands.add('addMultipleAssets', (qty, counter) => {
    while (qty > 0) {
        cy.createAssetName('ISIN', counter).then(assetName => {
            cy.log(` It will be create the asset: ${assetName} `)
            cy.addAssets(assetName)
        })
        qty--
    }
    cy.setCounter()
})

Cypress.Commands.add('getAssetsById', (assetId) => {
    cy.getAssets()
        .then((resp) => {
            if (resp) {
                return resp[assetId]
            } else {
                return false
            }
        })
})

Cypress.Commands.add('addAssets', (assetName) => {
    cy.request('POST', `${appData.addAssetsUrl}/${assetName}`).then(resp => {
        expect(resp.body).includes("Ok")
        expect(resp.status).to.eq(201)
        return assetName
    })
})

Cypress.Commands.add('getTheFirstAssets', () => {
    cy.getAssetsById(0)
        .then((resp) => {
            if (resp) {
                return resp
            } else {
                cy.addAssets('ISIN0000000001')
            }
        })
})

Cypress.Commands.add('interceptAddAssets', (assetName) => {
    cy.intercept('POST', `/addAsset/${assetName}`)
        .as('assetAdded')
})