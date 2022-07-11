/// <reference types="cypress" />
import { appData } from "../fixtures/fixture.json"
import { dataBuilder } from './utils'
import { addAssetTab, sendButton, closeButtonConfirmationAlert } from './POM/addAssetsPage'

Cypress.Commands.add('clickOnAddAssetTab', () => {
    addAssetTab().click()
})

Cypress.Commands.add('clickOnSendButton', () => {
    sendButton().click()
})

Cypress.Commands.add('closePopUpAssetAdded', () => {
    closeButtonConfirmationAlert().click()
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

function generateAssetName() {
    let { id } = dataBuilder()
    id = id.toString().padStart(10, '0');
    return `ISIN${id}`
}

Cypress.Commands.add('createAssetName', () => {
    let assetName = generateAssetName()

    cy.getAssets()
        .then(arr => {
            if (arr.length) {
                while (arr.includes(assetName)) {
                    assetName = generateAssetName()
                }
            }
            return assetName
        })
})

Cypress.Commands.add('addMultipleAssets', (qty) => {
    while (qty > 0) {
        cy.createAssetName().then(assetName => {
            cy.log(` It will be create the asset: ${assetName} `)
            cy.addAssets(assetName)
        })
        qty--
    }
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