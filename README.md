# GENERIC CUCUMBER PROTRACTOR FRAMEWORK #

![alt text](http://i65.tinypic.com/fasv1s.jpg)

###### Owner: Lead Automation Engineer for Digital Melbourne (TABCORP) - <a href="https://au.linkedin.com/in/cambradley">Cameron Bradley</a>

## Folder Structure

### Your Project:

./e2e
 * /config
 * /features
   * custom_steps
     * custom_steps.js
   * definitions
     * pages
        * pages.json
        * page_name.json
   * feature.feature

### The Common Repository:

../../node_modules/generic-cucumber-protractor-framework/step_definitions
 * /definitions
    * elements.js
 * /fake_data
 * /node_modules
 * /step_definitions
   * env.js
   * fake_data_steps.js
   * form_steps.js
   * general_steps.js
   * hooks.js
   * navigation_steps.js
   * rest_steps.js
   * stored_steps.js
   * table_steps.js  
 * /support
     * browsers.js
     * fake_data.js
     * form.js
     * general.js
     * helpers.js
     * json_path.js
     * navigation.js
     * page.js
     * pageObjects.js
     * request.js
     * restConfig.js
     * step_definitions_manager.js
     * stored_data.js
     * tag_manager.js
     * waitFor.js
   


#### Environment Variables ####

##### You will need to set the below in CI:

WEB_SERVER - default = localhost <br />
WEB_SERVER_PORT - default = 9000 <br />
LOCAL_API_ROUTE - default = blank

# Cucumber steps available

FORM STEPS
----------

    Then I fill in the "([^"]*)" input with "([^"]*)"
    Then I select the "([^"]*)" as "([^"]*)"
    Then the "([^"]*)" input should equal the value "([^"]*)"
   
    
GENERAL STEPS
-------------

### Click ###

#### Single element ####

    When I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" (?:button|link|icon|element)
    And I hover over the "([^"]*)"
    And I refresh the page
    And I click the "([^"]*)"
    And I mouse over "([^"]*)"
    
#### Element at Index ####
    
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
    When I click the "([^"]*)" (?:button|link|icon|element) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
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
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" element
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([^"]*)" "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute does not contain the text for "([^"]*)"
    Then I see the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
    
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
 
REST STEPS
----------

    When I retrieve and store the "(.*)" from "([^"]*)" as "([^"]*)"
    
STORED STEPS
------------

#### Single element ####

    When I store the number of "([^"]*)" as "([^"]*)"
    When I store the "([^"]*)" input value as "([^"]*)"
    When I store each "([^"]*)" "([^"]*)" element attribute as "([^"]*)" for the "([^"]*)"
    Then the "([^"]*)" contains the stored "([^"]*)"
        
#### Element at Index ####
        
    When I store the number of "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"     
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"
    When I store the last "([^"]*)" as "([^"]*)"
    When I store the "([^"]*)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)" within the "([^"]*)" "([^"]*)" 
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the stored "([^"]*)"
    
TABLE STEPS
-----------

    Then the "([^"]*)" table contains the following
    Then the "([^"]*)" table does not contain the following
    
FAKE DATA STEPS
---------------

    When I fill in the "([^"]*)" input with "([^"]*)" fake data