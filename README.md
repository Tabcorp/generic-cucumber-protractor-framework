# GENERIC CUCUMBER PROTRACTOR FRAMEWORK #

![alt text](http://i65.tinypic.com/fasv1s.jpg)

###### Owner: Lead Automation Engineer for Digital Melbourne (TABCORP) - <a href="https://au.linkedin.com/in/cambradley">Cameron Bradley</a>

FORM STEPS
----------

    Then I fill in the "([^"]*)" input with "([^"]*)"
    Then I select the "([^"]*)" as "([^"]*)"
   
    
GENERAL STEPS
-------------

### Click ###

#### Single element ####

    When I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" (?:button|link|icon|element) within the "([^"]*)" "([^"]*)"
    When I click the "([^"]*)" (?:button|link|icon|element)
    And I click the "([^"]*)"
    And I mouse over "([^"]*)"
    
#### Element at Index ####
    
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
    When I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"
    
### Assertions ###


#### Single element ####

    Then the "([^"]*)" element should( not)? be displayed
    Then the "([^"]*)" element should( not)? be present
    Then the "([^"]*)" element within the "([^"]*)" should be present
    Then the "([^"]*)" element should( not)? be enable
    Then the "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"
    Then the "([^"]*)" contains the "([^"]*)" attributes "([^"]*)"
    Then the "([^"]*)" contains the "([^"]*)" text "([^"]*)"
    Then the "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"
    Then the "([^"]*)" does not contain the "([^"]*)" attributes "([^"]*)"
    Then the "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"
    Then the "([^"]*)" contains the text "([^"]*)"
    Then the "([^"]*)" does not contain the text "([^"]*)"
    Then the "([^"]*)" contains the value "([^"]*)"
    Then the "([^"]*)" contains no text
    Then I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)
    
#### Element at Index ####
    
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the text "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" element
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" element
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([^"]*)" "([^"]*)"
    
### Wait and Scroll ###
    
    And I wait "([^"]*)" seconds
    When I scroll down (\d+)$
    
    
NAVIGATION STEPS
----------------
 
    Given I am on the "([^"]*)" page
    Given I am directed to the "([^"]*)" page
    Given I set the page to "([^"]*)"
    Then I see the "([^"]*)" page title
    When I navigate to the "([^"]*)" page
    When I navigate directly to the "([^"]*)" page with the stored "([^"]*)"
    
    
STORED STEPS
------------

#### Single element ####

    Then the "([^"]*)" contains the stored "([^"]*)"
        
#### Element at Index ####
        
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the text for "([^"]*)"
    
    
TABLE STEPS
-----------

    Then the "([^"]*)" table contains the following
    Then the "([^"]*)" table does not contain the following
    
FAKE DATA STEPS
---------------

    When I fill in the "([^"]*)" input with "([^"]*)" fake data