'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');
const pageObjects = require('../support/pageObjects');
const page = require('../support/page');
const helpers = require('../support/helpers');
const waitFor = require('../support/waitFor');


Then(/^the "([^"]*)" contains a correctly formatted date$/, function(main_element_name, next) {
  const main_element_selector = pageObjects.elementFor(main_element_name);
  pageObjects.waitForElementToLoad(main_element_selector)
  .then(function (current_element) {
    return waitFor(() => {
        return current_element.getText().then(function (ui_text) {
            var current_text = helpers.replaceLineBreaks(ui_text);
            return current_text.should.match(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s[0-9]{1,2}\,?\s+(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s?(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)?(\s\d{4})?$/);
            });
        });
    }).should.notify(next);
});

Then(/^the "([^"]*)" contains a correctly formatted time$/, function(main_element_name, next) {
  const main_element_selector = pageObjects.elementFor(main_element_name);
  pageObjects.waitForElementToLoad(main_element_selector)
  .then(function (current_element) {
    return waitFor(() => {
        return current_element.getText().then(function (ui_text) {
            var current_text = helpers.replaceLineBreaks(ui_text);
            return current_text.should.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3])\s?:?[0-5][0-9]\s?(AM|PM)?$/);
          });
        });
    }).should.notify(next);
});
