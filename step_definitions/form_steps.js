var pageObjects = require('../support/pageObjects');
var general = require('../support/general')
var form = require('../support/form');
const waitFor = require('../support/waitFor');

module.exports = function () {

    this.Then(/^I click the "([^"]*)" (?:input|select|textarea|checkbox)$/, function (element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
            })
            }).should.notify(next);
    });

    this.Then(/I fill in the "([^"]*)" input with "([^"]*)"$/, function (element_name, value, next) {
        var element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                //current_element.clear();
                current_element.sendKeys(value).then(() => {
                    next();
            }, (err) => {
                    next(err);
                });
            });
    });

    this.Then(/I fill in the "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, function (second_element_name, value, main_element_index, main_element_name, next) {
        const main_index = parseInt(main_element_index) - 1;
        const main_element_selector = pageObjects.elementFor(main_element_name);
        const secondary_element_selector = pageObjects.elementFor(second_element_name);
        pageObjects.waitForElementWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_element_selector)
            .then(function (current_element) {
                //current_element.clear();
                current_element.sendKeys(value).then(() => {
                    next();
                }, (err) => {
                    next(err);
                });
            });
    });

    this.Then(/I fill in the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, function (second_element_index, second_element_name, value, main_element_index, main_element_name, next) {
        const main_index = parseInt(main_element_index) - 1;
        const main_element_selector = pageObjects.elementFor(main_element_name);
        const secondary_element_selector = pageObjects.elementFor(second_element_name);
        const secondary_index = parseInt(second_element_index) - 1;
        pageObjects.waitForElementAtIndexWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_index, secondary_element_selector)
            .then(function (current_element) {
                //current_element.clear();
                current_element.sendKeys(value).then(() => {
                    next();
                }, (err) => {
                    next(err);
                });
            });
    });

    this.Then(/I select the "([^"]*)" as "([^"]*)"$/, function (element_name, value, next)  {
        var element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function(current_element) {
                current_element.all(by.cssContainingText('option', value)).click().then(() => {
                    next();
            }, (err) => {
                    next(err);
                });
            });
    });

    this.Then(/^the "([^"]*)" input should equal the value "([^"]*)"$/, function (element_name, value, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function(current_element) {
                current_element.getAttribute('value').should.eventually.equal(value).and.notify(next);
            });
    });

    this.Then(/I clear the field "([^"]*)"$/, function (element_name, next) {
      const element_selector = pageObjects.elementFor(element_name);
      pageObjects.waitForElementToLoad(element_selector)
        .then(function (current_element) {
          current_element.clear().then(() => {
            next();
          }, (err) => {
            next(err);
          });
        });
    });

}
