# GENERIC CUCUMBER PROTRACTOR FRAMEWORK #

![alt text](http://i65.tinypic.com/25zge2g.png)

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
   
### Get up and running:

1.) Install the generic-common-protractor-framework into your project

    npm install generic-cucumber-protractorc-framework@latest --save-dev

2.) Ensure your project has the following (required for the protractor_conf.js)

    npm install cucumber@latest --save-dev
    npm install protractor@latest --save-dev
    npm install protractor-cucumber-framework@latest --save-dev

3.) Refer to the protractor_conf_example 

Copy and paste the protractor-conf.js into /e2e/config and update accordingly.

### The Common Repository:

../../node_modules/generic-cucumber-protractor-framework/step_definitions
 * /definitions
    * elements.js
 * /fake_data
 * /node_modules
 * /step_definitions
   * alert_steps.js 
   * env.js
   * fake_data_steps.js
   * form_steps.js
   * general_steps.js
   * hooks.js
   * hotkey_steps.js
   * json_path_steps.js
   * navigation_steps.js
   * rest_steps.js
   * scroll_Steps.js
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
     * request_payloads.js
     * restConfig.js
     * servers.js
     * step_definitions_manager.js
     * stored_data.js
     * tag_manager.js
     * waitFor.js

Packages installed by the common repository

    "JSONPath"
    "chai"
    "chai-as-promised"
    "chai-things"
    "cucumber-pretty"
    "faker"
    "lodash"
    "protractor-flake"
    "protractor-hotkeys"
    "q"
    "request"
    "request-promise"

#### Environment Variables ####

##### You will need to set the below in CI:

WEB_SERVER - default = localhost <br />
WEB_SERVER_PORT - default = 9000 <br />
LOCAL_API_ROUTE - default = blank <br />
UAT_UI_ROUTE - default = blank <br />
PREPROD_UI_ROUTE - default = blank <br />
PRODUCTION_UI_ROUTE - default = blank <br />
SPECIAL_EXCLUDED_TAGS - default = blank <br />
BROWSER - default = chrome (option: firefox) <br />
BROWSER_RESOLUTION - default = desktop (option: mobile, tablet or desktop) <br />
MOBILE_UI_HEIGHT - default = 375 <br />
MOBILE_UI_WIDTH - default = 667 <br />
TABLET_UI_HEIGHT - default = 768 <br />
TABLET_UI_WIDTH - default = 1024 <br />
DESKTOP_UI_HEIGHT - default = 1200 <br />
DESKTOP_UI_WIDTH - default = 800 <br />
EXTENDED_POLL_WAIT_ON_CLICK - default = 100 <br />

# Cucumber steps available

FORM STEPS
----------

#### Single element ####

    Then I fill in the "([^"]*)" input with "([^"]*)"
    Then I select the "([^"]*)" as "([^"]*)"
    Then the "([^"]*)" input should equal the value "([^"]*)"
    When I clear the field "([^"]*)"
    
#### Element at Index ####

    When I fill in the "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
    When I fill in the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)

GENERAL STEPS
-------------

### Click ###

#### Single element ####

    When I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" with the text "([^"]*)"
    When I click the "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "([^"]*)" (?:button|link|icon|element)
    And I hover over the "([^"]*)"
    And I refresh the page
    And I click the "([^"]*)"
    And I mouse over "([^"]*)"
    And a new tab is opened with the url containing "([^"]*)"

#### Element at Index ####

    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
    When I click the "([^"]*)" (?:button|link|icon|element) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
    When I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"
    When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|checkbox) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"

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
    Then the "([^"]*)" containing the text "([^"]*)" has a "([^"]*)" element
    Then the "([^"]*)" contains the text "([^"]*)"
    Then the "([^"]*)" does not contain the text "([^"]*)"
    Then the "([^"]*)" contains the value "([^"]*)"
    Then the "([^"]*)" contains no text
    Then I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)
    Then I can see more than "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)

#### Element at Index ####

    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the text "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the text "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be present
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
   

### Wait ###

    And I wait "([^"]*)" seconds

SCROLL STEPS
-------------
    When I scroll down (\d+)$
    When I scroll to the bottom of the page
    When I scroll to the top of the page
    When I scroll down (\d+) within the "([^"]*)"

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

    When I have a created a "([^"]*)" for "([^"]*)" through the "([^"]*)"
    When I retrieve and store the "(.*)" from "([^"]*)" as "([^"]*)"

STORED STEPS
------------

#### Single element ####

    When I store the number of "([^"]*)" as "([^"]*)"
    When I store the "([^"]*)" as "([^"]*)"
    When I store the "([^"]*)" number as "([^"]*)"
    When I store the "([^"]*)" input value as "([^"]*)"
    When I store each "([^"]*)" "([^"]*)" element attribute as "([^"]*)" for the "([^"]*)"
    Then the "([^"]*)" should be "([^"]*)" less than the stored number for "([^"]*)"
    Then the "([^"]*)" contains the stored "([^"]*)"
    Then I see the "([^"]*)" and stored "([^"]*)" page title

#### Element at Index ####

    When I store the number of "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"     
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)"
    When I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"
    When I store the last "([^"]*)" as "([^"]*)"
    When I store the "([^"]*)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)" within the "([^"]*)" "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the stored text for "([^"]*)"
    Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the stored "([^"]*)"
    Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" number should be "([^"]*)" less than the stored number for "([^"]*)"

TABLE STEPS
-----------

    Then the "([^"]*)" table contains the following
    Then the "([^"]*)" table does not contain the following

FAKE DATA STEPS
---------------

    When I fill in the "([^"]*)" input with "([^"]*)" fake data
