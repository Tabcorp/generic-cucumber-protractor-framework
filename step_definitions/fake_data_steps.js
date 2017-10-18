var pageObjects = require('../support/pageObjects');
var fake_data = require('../support/fake_data');
var helpers = require('../support/helpers')

module.exports = function() {

    this.Given(/I fill in the "([^"]*)" input with "([^"]*)" fake data$/, function (element_name, value, next) {
        var element_selector = pageObjects.elementFor(element_name);
        var fake_data_value = eval(fake_data.fakerFor(value)) + helpers.randomString(6);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                current_element.sendKeys(fake_data_value).then(() => {
                    next();
            }, (err) => {
                    next(err);
                });
            });
    });

}
