Feature: Business critical positive scenarios

    Verify the proper operation of most critial positive scearnios

    @counterNeeded
    Scenario Outline: 1. Add a asset successfully
        Given I go to the Add Asset tab
        When Validate page title and url
        And I type a valid name starting with <assetName> in the asset input box
        And I press send button
        And Validate the asset <assetName> is added successfully
        Then I close notification message about the result adding asset

        Examples:
            | assetName |
            | "ISIN"    |

    @counterNeeded
    Scenario: 2. Create an asset, go to Existing Assets tab, sort the table and verify the asset is there
        Given I have created a new asset
        When I go to the Existing Assets tab
        Then I Sort by last assert name
        And Verify the value is in the table

    @counterNeeded
    Scenario: 3. Create an asset, go to Existing Assets tab, do a search and verify the asset is there
        Given I have created a new asset
        When I go to the Existing Assets tab
        Then I do a search by the asset name
        And Verify the value is in the table

    @counterNeeded
    Scenario Outline: 4. Create an asset, go to Existing Assets tab, do a search and verify the asset is there
        Given I will create the required assets up to 148
        When I go to the Existing Assets tab
        And I select the entry view in <showEntry>
        Then Verify the amount of assets is in the table is <entryAmount>

        Examples:
            | showEntry | entryAmount |
            | "10"      | 10          |
            | "20"      | 20          |
            | "50"      | 50          |
            | "100"     | 100         |
