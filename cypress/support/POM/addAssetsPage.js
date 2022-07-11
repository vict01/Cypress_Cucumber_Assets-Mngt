export function assetNameInput() {
    return cy.get('#defaultFormAddAsset')
}

export function feedbackSAlertAddingAsset() {
    return cy.get('[data-test="modal-body"]')
}

export function headingAlertAddingAsset() {
    return cy.get('.modal-title')
}

export function labelConfirmationAddingAsset() {
    return cy.get('.valid-feedback')
}

export function addAssetTab() {
    return cy.get('[testid="add-asset"]')
}

export function sendButton() {
    return cy.get('[data-test="button"]')
}

export function closeButtonConfirmationAlert() {
    return cy.get('[data-test="modal-footer"] > [data-test="button"]')
}