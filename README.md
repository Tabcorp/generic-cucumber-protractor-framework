# GENERIC PROTRACTOR FRAMEWORK #


FORM STEPS
----------

    Then I fill in the "([^"]*)" input with "([^"]*)"
   
    
GENERAL STEPS
-------------

### Click ###

    When I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" button within the "([^"]*)" "([^"]*)"
    When I click the "([^"]*)" (?:button|link|icon|element)
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
    And I click the "([^"]*)"
    And I mouse over "([^"]*)"
    
### Assertions ###
    
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the text "([^"]*)"
    Then the "([^"]*)" element should( not)? be displayed$
    Then the "([^"]*)" element should( not)? be present
    Then the "([^"]*)" element should( not)? be enable
    Then the "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"
    Then the "([^"]*)" contains the "([^"]*)" attributes "([^"]*)"
    Then the "([^"]*)" does not contain the "([^"]*)" attributes "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"
    Then the "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"
    Then the "([^"]*)" contains the text "([^"]*)"
    Then the "([^"]*)" does not contain the text "([^"]*)"
    Then the "([^"]*)" contains the value "([^"]*)"
    Then the "([^"]*)" contains no text
    Then I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)
    
### Wait and Scroll ###
    
    And I wait "([^"]*)" seconds
    When I scroll down (\d+)$
    
    
NAVIGATION STEPS
----------------
 
    Given I am on the "([^"]*)" page
    Given I am directed to the "([^"]*)" page
    Given I set the page to "([^"]*)"
    
    
STORED STEPS
------------

    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"
    Then the "([^"]*)" contains the stored "([^"]*)"
    
    
TABLE STEPS
-----------

    Then the "([^"]*)" table contains the following
    Then the "([^"]*)" table does not contain the following