Feature: 1. Business critical positive scenarios

    Verify the proper operation of most critial positive scearnios

    Scenario: 1.1. Add an asset successfully
        Given I go to the Add Asset tab
        When Validate page title and url
        #Below, the word ISIN is treated as a variable:
        And I type a valid name starting with ISIN in the asset input box
        And I press send button
        And Validate the asset was added successfully
        Then I close notification message about the result adding asset

    Scenario: 1.2. Create an asset, go to Existing Assets tab, do a search and verify the asset is there
        Given I have created a new asset
        When I go to the Existing Assets tab
        Then I do a search by the asset name
        And Verify the value is in the table

    Scenario Outline: 1.3.<ExampleId> Set the entry view in <AmountOfEntries> and verify is displayed accordingly
        Given I will create the required assets up to 100
        When I go to the Existing Assets tab
        And I select the entry view in: <AmountOfEntries>
        Then Verify the amount of assets in the table is: <AmountOfEntries>

        Examples:
            | ExampleId | AmountOfEntries |
            | 1         | 10              |
            | 2         | 20              |
            | 3         | 50              |
            | 4         | 100             |
