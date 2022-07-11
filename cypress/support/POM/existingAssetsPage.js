export function labelNoRecordFound() {
    return cy.findAllByText(/No matching records found/i)
}

export function existingAssetsTab() {
    return cy.get('.item').last()
}

export function sortTableButton() {
    return cy.get('.sorting')
}

export function sortTableAscButton() {
    return cy.get('.sorting_asc')
}

export function assetsTable() {
    return cy.get('[data-test="table-body"]')
}

export function searchAssetsBar() {
    return cy.get('[data-test="datatable-input"]')
}

export function showEntryDrop() {
    return cy.get('.custom-select')
}