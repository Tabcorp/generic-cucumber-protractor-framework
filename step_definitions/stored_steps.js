const pageObjects = require('../support/pageObjects');
const stored_data = require('../support/stored_data');
const general = require('../support/general');
const waitFor = require('../support/waitFor');

module.exports = function() {


    this.When(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"$/, function (indexText, element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            stored_data.setData(name, ui_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"$/, function (indexText, element_name, element_type, element_attribute, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getAttribute(element_attribute).then(function (retrieved_text) {
                        console.log(retrieved_text);
                        stored_data.setData(name, retrieved_text);
                        })
                })
            }).should.notify(next);
    });

    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            console.log(retrieved_text)
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the text for "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });


    this.Then(/^the "([^"]*)" contains the stored "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (retrieved_text) {
                            const retrieved_stored_value = stored_data.getData(name);
                            return retrieved_text.toString().should.include(retrieved_stored_value);
                        })
                    })
            }).should.notify(next);
    });

}
