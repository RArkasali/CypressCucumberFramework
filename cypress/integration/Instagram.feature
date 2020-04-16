Feature: Instagram - Login
  
  Scenario: Login Instagram
    Given I open Instagram page
    And Login by "hanguyen"
    Then I see "imgMsg" image

  Scenario: Logout Instagram
    Given Click logout button
    Then I see "lblMsg" text