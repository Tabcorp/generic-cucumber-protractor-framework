const pageObjects = require('../support/pageObjects');
const jsonStore = require('../support/json_store');
const jsonPath = require('JSONPath');

module.exports = function() {

    this.Then(/^I fill in the "([^"]*)" input with the stored json for "([^"]*)"$/, function (element_name, stored_json, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const current_stored_data = jsonPath.eval(jsonStore.getJson(), stored_json);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                current_element.sendKeys(String(current_stored_data)).then(() => {
                    next();
            }, (err) => {
                    next(err);
                });
            });
    });

}
