Feature: Google and show encrypt data on search textbox
  
  @focus
  Scenario: Show encrypt data on search textbox
    Given I open Google page
    And Type "hanguyen" to "txtSearch" textbox
    Then I see "Google" in the title