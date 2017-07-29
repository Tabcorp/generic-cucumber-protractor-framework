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

}
