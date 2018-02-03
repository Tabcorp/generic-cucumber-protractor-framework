'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const pageObjects = require('../support/pageObjects');
const jsonStore = require('../support/json_store');
const jsonPath = require('JSONPath');

Then(/^I fill in the "([^"]*)" input with the stored json for "([^"]*)"$/, function (main_element_name, stored_json, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const current_stored_data = jsonPath.eval(jsonStore.getJson(), stored_json);
    console.log(current_stored_data);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            current_element.sendKeys(String(current_stored_data)).then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});
