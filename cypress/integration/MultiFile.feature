Feature: Login and logout on MultiFile
  
  Scenario Outline: Login url of environment and then logout
    Given I open "<environment>" page
    And I login by "<nick>" of account
    And Logout
    Then I see login page

        Examples:
      | environment | nick|
      | production | Bronze|
