Feature: Business critical negative scenarios

    Verify the proper operation of most critial negative scearnios
   
    Scenario Outline: 1. Add an asset without matching the required format
        Given I go to the Add Asset tab
        When Validate page title and url
        And I type the name <assetName> in the asset input box
        And I press send button
        Then Validate the asset is not added due to unmatching format

        Examples:
            | assetName |
            | "ABCD32"  |
    
    Scenario: 2. Add an asset indicating an existing asset name
        Given I go to the Add Asset tab
        When Validate page title and url
        And I type an existing name in the asset input box
        And I press send button
        And Validate the asset is not added because of the name already exists
        Then I close notification message about the result adding asset

    Scenario: 3. Add an asset without filling out the asset name field
        Given I go to the Add Asset tab
        When Validate page title and url
        And I press send button
        Then Validate the asset is not added due to empty asset name field

    Scenario: 4. Go to Existing Assets tab, do a search by nonexistent asset and verify it is not there
        Given I go to the Existing Assets tab
        When I do a search by the asset name "assetTest"
        Then Verify there is no result in the table
