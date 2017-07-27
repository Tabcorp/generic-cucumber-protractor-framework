const general = require('../support/general');
const pageObjects = require('../support/pageObjects');
const page = require('../support/page');
const helpers = require('../support/helpers');
const browsers = require('../support/browsers');
const waitFor = require('../support/waitFor');

module.exports = function () {

    this.When(/^I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, function (element_name, page_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const current_url = page.getPageURL(page_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
            })
            })
            .then(function () {
                page.setPage(page_name);
                return waitFor(() => {
                        return browsers.myBrowser().getCurrentUrl().then(function(url){
                            url.toLowerCase().should.contain(current_url);
                        })
                    });
            }).should.notify(next);
    });

    this.When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, function (indexText, element_name, page_name, next) {
        const index = parseInt(indexText) - 1;
        const element_selector = pageObjects.elementFor(element_name);
        const current_url = page.getPageURL(page_name);
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
            })
            })
            .then(function () {
                page.setPage(page_name);
                return waitFor(() => {
                        return browsers.myBrowser().getCurrentUrl().then(function(url){
                            url.toLowerCase().should.contain(current_url);
                        })
                    });
            }).should.notify(next);
    });

    this.Then(/^I click the "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, function (element_type, current_text, page_name, next) {
        const current_element_type = pageObjects.elementTypeFor(element_type);
        const current_url = page.getPageURL(page_name);
        pageObjects.waitForElementWithTextToLoad(current_element_type, current_text)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
            })
            })
            .then(function () {
                page.setPage(page_name);
                return waitFor(() => {
                        return browsers.myBrowser().getCurrentUrl().then(function(url){
                            url.toLowerCase().should.contain(current_url);
                        })
                    });
            }).should.notify(next);
    });

    this.Then(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, function (indexText, element_type, current_text, page_name, next) {
        const index = parseInt(indexText) - 1;
        const current_url = page.getPageURL(page_name);
        const current_element_type = pageObjects.elementTypeFor(element_type);
        pageObjects.waitForElementWithTextAtIndexToLoad(current_element_type, index, current_text)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
            })
            })
            .then(function () {
                page.setPage(page_name);
                return waitFor(() => {
                        return browsers.myBrowser().getCurrentUrl().then(function(url){
                            url.toLowerCase().should.contain(current_url);
                        })
                    });
            }).should.notify(next);
    });

    this.Given(/^I click the "([^"]*)" (?:button|link|icon|element) within the "([^"]*)" "([^"]*)"$/, function (second_element, indexText, main_element, next) {
        const index = parseInt(indexText) - 1;
        const main_element_selector = pageObjects.elementFor(main_element);
        const secondary_element_selector = pageObjects.elementFor(second_element);
        pageObjects.waitForElementWithinElementAtIndexToLoad(index, main_element_selector, secondary_element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.click();
                })
            }).should.notify(next);
    });

    this.Then(/^I click the "([^"]*)" (?:button|link|icon|element)$/, function (element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(() => general.getElement(element_selector).click())
        .should.notify(next);
    });

    this.Then(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, function (indexText, button, next) {
        const index = parseInt(indexText) - 1;
        const element_selector = pageObjects.elementFor(button);
        pageObjects.waitForElementToLoad(element_selector)
            .then(() => general.getElementAtIndex(index, element_selector).click())
        .should.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" element$/, function (indexText, main_element, second_element, next) {
        const index = parseInt(indexText) - 1;
        const main_element_selector = pageObjects.elementFor(main_element);
        const secondary_element_selector = pageObjects.elementFor(second_element);
        general.checkElementWithinElementAtIndexIsNotDisplayed(index, secondary_element_selector, main_element_selector).should.eventually.be.false.and.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" element$/, function (indexText, main_element, second_element, next) {
        const index = parseInt(indexText) - 1;
        const main_element_selector = pageObjects.elementFor(main_element);
        const secondary_element_selector = pageObjects.elementFor(second_element);
        general.checkElementWithinElementAtIndexIsDisplayed(index, secondary_element_selector, main_element_selector).should.eventually.be.true.and.notify(next);
    });


    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" text "([^"]*)"$/, function (indexText, element_name, attribute_type, text, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        general.checkElementTextAtIndexIsPresent(index, element_selector, attribute_type, text).should.eventually.be.true.and.notify(next);
    });


    this.When(/^I mouse over "([^"]*)"$/, function (element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementHover(element_selector)
            .then(function () {
                next();
            });
    });

    this.Then(/^I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (indexText, element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementHover(element_selector)
            .then(function () {
                browser.actions().mouseMove(general.getElementAtIndex(index, element_selector));
                next();
            });
    });


    this.When(/^I wait "([^"]*)" seconds?$/, function (seconds, next) {
        browser.sleep(seconds * 1000).then(next);
    });

    this.Then(/^the "([^"]*)" element should( not)? be displayed$/, function (element_name, negate, next) {
        const element_selector = pageObjects.elementFor(element_name);
        if (negate) {
            general.checkElementIsNotDisplayed(element_selector).should.notify(next);
        } else {
            general.checkElementIsDisplayed(element_selector).should.notify(next);
        }
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed$/, function (indexText, element_name, negate, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        if (negate) {
            general.checkElementAtIndexIsNotDisplayedd(index, element_selector).should.notify(next);
        } else {
            general.checkElementAtIndexIsDisplayed(index, element_selector).should.notify(next);
        }
    });


    this.Then(/^the "([^"]*)" element should( not)? be present$/, function (element_name, negate, next) {
        const element_selector = pageObjects.elementFor(element_name);
        if (negate) {
            general.checkElementIsNotPresent(element_selector).should.notify(next);
        } else {
            general.checkElementIsPresent(element_selector).should.notify(next);
        }
    });

    this.Then(/^the "([^"]*)" element should( not)? be enable/, function (element, negate, next) {
        var current_element = pageObjects.elementFor(element);
        if (negate) {
            general.getElement(current_element).isEnabled().should.not.be.true.and.notify(next);
        } else {
            general.getElement(current_element).isEnabled().should.be.true.and.notify(next);
        }
    });


    this.Then(/^the "([^"]*)" contains the text "([^"]*)"$/, function (element_name, text, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            const current_text = ui_text;
                            return current_text.should.contain(text);
                        });
            });
            }).should.notify(next);
    });

    this.Then(/^the "([^"]*)" contains no text$/, function (element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            const current_text = ui_text;
                            return current_text.should.have.length(0);
                        });
            });
            }).should.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the text "([^"]*)"$/, function (indexText, element_name, text, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementToLoad(element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.checkTextAtIndexIsPresent(element_selector, index).getText().then(function (ui_text) {
                            const current_text = ui_text;
                            return current_text.should.contain(text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([^"]*)" "([^"]*)"$/, function (indexText, main_element, count, second_element, next) {
        const main_element_index = parseInt(indexText) - 1;
        var current_main_element = pageObjects.elementFor(main_element);
        var current_second_element = pageObjects.elementFor(second_element);
        pageObjects.waitForElementToLoad(current_main_element)
            .then(function () {
                general.getElementsCountWithInParentElementAtIndex(main_element_index, current_main_element, current_second_element).should.eventually.equal(parseInt(count)).should.notify(next);
            });
    });


    this.Then(/^the "([^"]*)" element within the "([^"]*)" should be present$/, function (second_element, main_element, next) {
        var current_main_element = pageObjects.elementFor(main_element);
        var current_second_element = pageObjects.elementFor(second_element);
        general.checkElementWithinElementIsPresent(current_main_element, current_second_element).should.eventually.be.true.and.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the text "([^"]*)"$/, function (indexText, element_name, text, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementToLoad(element_selector)
            .then(function () {
                general.checkTextAtIndexIsPresent(element_selector, index).getText().should.eventually.not.contain(text).and.notify(next);
            })
    });

    this.Then(/^the "([^"]*)" contains the value "([^"]*)"$/, function (element_name, expectedValue, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getAttribute('value').then(function (actualValue) {
                            const current_value = actualValue;
                            return current_value.should.contain(expectedValue);
                        });
            });
            }).should.notify(next);
    });

    this.Then(/^the "([^"]*)" does not contain the text "([^"]*)"$/, function (element_name, text, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().should.eventually.not.contain(text);
            });
            }).should.notify(next);
    });

    this.Then(/^the "([^"]*)" contains the "([^"]*)" text "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementTextPresent(element_selector, attribute_type, attribute).should.eventually.be.true.and.notify(next);
    });

    this.Then(/^the "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementTextPresent(element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"$/, function (indexText, element_name, attribute_type, attribute, next) {
        const index = parseInt(indexText) - 1;
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementTextAtIndexPresent(index, element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
    });

    this.Then(/^the "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementAttributePresent(element_selector, attribute_type, attribute).should.notify(next);
    });

    this.Then(/^the "([^"]*)" contains the "([^"]*)" attributes "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementAttributesPresent(element_selector, attribute_type, attribute).should.notify(next);
    });

    this.Then(/^the "([^"]*)" does not contain the "([^"]*)" attributes "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementAttributesPresent(element_selector, attribute_type, attribute).should.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"$/, function (indexText, element, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        general.checkClassAtIndexIsPresent(index, element_selector, attribute_type, attribute).should.eventually.be.true.and.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"$/, function (indexText, element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        general.checkClassAtIndexIsPresent(index, element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
    });


    this.Then(/^the "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"$/, function (element_name, attribute_type, attribute, next) {
        const element_selector = pageObjects.elementFor(element_name);
        general.isElementAttributePresent(element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
    });

    this.Then(/^I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)$/, function (count, element_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementsToLoad(element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementsCount(element_selector).should.eventually.equal(parseInt(count));
                    })
            }).should.notify(next);
    });

    this.Given(/^I see the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"$/, function (second_element_index, second_element, main_element_index, main_element, next) {
        const main_element_selector = pageObjects.elementFor(main_element);
        const secondary_element_selector = pageObjects.elementFor(second_element);
        const main_index = parseInt(main_element_index) - 1;
        const secondary_index = parseInt(second_element_index) - 1;
        pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.checkElementAtIndexWithInElementAtIndexDisplayed(secondary_index, secondary_element_selector, main_index, main_element_selector).should.eventually.be.true.and.notify(next);
                })
            }).should.notify(next);
    });

    this.Then(/^I scroll down (\d+)$/, function (scroll_amount, next) {
        general.scrollDown(scroll_amount)
            .then(function () {
                next();
            });
    });


};
