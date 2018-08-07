'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const Q = require('q');
const general = require('../support/general');
const pageObjects = require('../support/pageObjects');
const page = require('../support/page');
const helpers = require('../support/helpers');
const browsers = require('../support/browsers');
const waitFor = require('../support/waitFor');


When(/^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, function (element_index, element_name, page_name, next) {
    const main_index = parseInt(element_index) - 1;
    const main_element_selector = pageObjects.elementFor(element_name);
    const current_url = page.getPageURL(page_name);
    pageObjects.waitForElementAtIndexToBeClickable(main_index, main_element_selector)
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

Then(/^I click the "([^"]*)" with the text "([^"]*)"$/, function (element_name, element_text, next) {
    const main_element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementWithTextToLoad(main_element_selector, element_text)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.click();
            })
        }).should.notify(next)
});

Then(/^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element)$/, function (element_index, element_name, next) {
    const main_index = parseInt(element_index) - 1;
    const main_element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
        .then(function(current_element) {
            const df = Q.defer();
            setTimeout(() => {
                current_element.click().then(function () {
                    df.resolve();
                }, function (err) {
                    console.log("element present but not visible on the screen - click using javascript");
                    browser.executeScript("arguments[0].scrollIntoView();",current_element);
                    df.resolve(browser.executeScript('arguments[0].click()', current_element));
                });
            }, process.env.EXTENDED_POLL_WAIT_ON_CLICK || 100);
            return df.promise;
        }).should.notify(next);
});

Then(/^I click the "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, function (element_type, element_text, page_name, next) {
    const main_element_type = pageObjects.elementTypeFor(element_type);
    const current_url = page.getPageURL(page_name);
    pageObjects.waitForElementWithTextToLoad(main_element_type, element_text)
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

Then(/^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, function (element_type_index, element_type, element_text, page_name, next) {
    const main_index = parseInt(element_type_index) - 1;
    const main_element_type = pageObjects.elementTypeFor(element_type);
    const current_url = page.getPageURL(page_name);
    pageObjects.waitForElementWithTextAtIndexToLoad(main_element_type, main_index, element_text)
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

Given(/^I click the "([^"]*)" (?:button|link|icon|element) within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (second_element_name, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.click();
            })
        }).should.notify(next);
});


Given(/^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element|checkbox) within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (second_element_index, second_element_name, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_index = parseInt(second_element_index) - 1;
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementAtIndexWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_index, secondary_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.click();
            })
        }).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the "([^"]*)" element$/, function (main_element_index, main_element_name, second_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    general.checkElementWithinElementAtIndexIsNotDisplayed(main_index, secondary_element_selector, main_element_selector).should.eventually.be.false.and.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the "([^"]*)" element$/, function (main_element_index, main_element_name, second_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    general.checkElementWithinElementAtIndexIsDisplayed(main_index, secondary_element_selector, main_element_selector).should.eventually.be.true.and.notify(next);
});


Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the "([^"]*)" text "([^"]*)"$/, function (main_element_index, main_element_name, attribute_type, element_text, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.checkElementTextAtIndexIsPresent(main_index, main_element_selector, attribute_type, element_text).should.eventually.be.true.and.notify(next);
});

When(/^I refresh the page$/, function (next) {
    browser.driver.navigate().refresh().then(browser.sleep(4000)).then(function () {
        //console.log("refreshing page")
        next();
    })
});

When(/^I mouse over "([^"]*)"$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementHover(main_element_selector)
        .then(function () {
            next();
        });
});

Then(/^I hover over the "([^"]*)"$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementHover(main_element_selector)
        .then(function () {
            browser.actions().mouseMove(general.getElement(main_element_selector));
            next();
        });
});

Then(/^I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementAtIndexHover(main_index ,main_element_selector)
        .then(function () {
            browser.actions().mouseMove(general.getElementAtIndex(main_index, main_element_selector));
            next();
        });
});

When(/^I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, function (main_element_name, page_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const current_url = page.getPageURL(page_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            const df = Q.defer();
            setTimeout(() => {
                current_element.click().then(function () {
                    df.resolve();
                }, function (err) {
                    console.log("element present but not visible on the screen - click using javascript");
                    browser.executeScript("arguments[0].scrollIntoView();",current_element);
                    df.resolve(browser.executeScript('arguments[0].click()', current_element));
                });
            }, process.env.EXTENDED_POLL_WAIT_ON_CLICK || 100);
            return df.promise;
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

Then(/^I click the "([^"]*)" (?:button|link|icon|element|radio button)$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            const df = Q.defer();
            setTimeout(() => {
                current_element.click().then(function () {
                    df.resolve();
                }, function (err) {
                    console.log("element present but not visible on the screen - click using javascript");
                    browser.executeScript("arguments[0].scrollIntoView();",current_element);
                    df.resolve(browser.executeScript('arguments[0].click()', current_element));
                });
            }, process.env.EXTENDED_POLL_WAIT_ON_CLICK || 100);
            return df.promise;
        }).should.notify(next);
});


When(/^I wait "([^"]*)" seconds?$/, function (seconds, next) {
    browser.sleep(seconds * 1000).then(next);
});

Then(/^the "([^"]*)" element should( not)? be displayed$/, function (main_element_name, negate, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    if (negate) {
        general.checkElementIsNotDisplayed(main_element_selector).should.notify(next);
    } else {
        general.checkElementIsDisplayed(main_element_selector).should.notify(next);
    }
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed$/, function (main_element_index, main_element_name, negate, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    if (negate) {
        general.checkElementAtIndexIsNotDisplayed(main_index, main_element_selector).should.notify(next);
    } else {
        general.checkElementAtIndexIsDisplayed(main_index, main_element_selector).should.notify(next);
    }
});


Then(/^the "([^"]*)" element should( not)? be present$/, function (main_element_name, negate, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    if (negate) {
        general.checkElementIsNotPresent(main_element_selector).should.notify(next);
    } else {
        general.checkElementIsPresent(main_element_selector).should.notify(next);
    }
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be present$/, function (main_element_index, main_element_name, negate, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    if (negate) {
        general.checkElementAtIndexIsNotPresent(main_index, main_element_selector).should.notify(next);
    } else {
        general.checkElementAtIndexIsPresent(main_index, main_element_selector).should.notify(next);
    }
});

Then(/^the "([^"]*)" element should( not)? be enable/, function (main_element_name, negate, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    if (negate) {
        general.getElement(main_element_selector).isEnabled().should.not.be.true.and.notify(next);
    } else {
        general.getElement(main_element_selector).isEnabled().should.be.true.and.notify(next);
    }
});

Then(/^the "([^"]*)" containing the text "([^"]*)" has a "([^"]*)" element$/, function (main_element_name, main_element_text, second_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    general.isElementWithinElementContainingTextPresent(main_element_selector, main_element_text, secondary_element_selector).should.eventually.be.true.and.notify(next);
});


Then(/^the "([^"]*)" contains the text "([^"]*)"$/, function (main_element_name, element_text, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.getText().then(function (ui_text) {
                    var current_text = helpers.replaceLineBreaks(ui_text);
                    return current_text.should.contain(element_text);
                });
            });
        }).should.notify(next);
});


Then(/^the "([^"]*)" contains no text$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.getText().then(function (ui_text) {
                    const current_text = ui_text;
                    return current_text.should.have.length(0);
                });
            });
        }).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the text "([^"]*)"$/, function (main_element_index, main_element_name, element_text, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.checkTextAtIndexIsPresent(main_element_selector, main_index).getText().then(function (ui_text) {
                    var current_text = helpers.replaceLineBreaks(ui_text);
                    return current_text.should.contain(element_text);
                })
            })
        }).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains "([^"]*)" "([^"]*)"$/, function (main_element_index, main_element_name, count, second_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function () {
            general.getElementsCountWithInParentElementAtIndex(main_index, main_element_selector, secondary_element_selector).should.eventually.equal(parseInt(count)).should.notify(next);
        });
});

Then(/^the "([^"]*)" element within the "([^"]*)" should be present$/, function (second_element_name, main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const second_element_selector = pageObjects.elementFor(second_element_name);
    general.checkElementWithinElementIsPresent(main_element_selector, second_element_selector).should.eventually.be.true.and.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the text "([^"]*)"$/, function (main_element_index, main_element_name, element_text, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function () {
            general.checkTextAtIndexIsPresent(main_element_selector, main_index).getText().should.eventually.not.contain(element_text).and.notify(next);
        })
});

Then(/^the "([^"]*)" contains the value "([^"]*)"$/, function (main_element_name, value, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.getAttribute('value').then(function (actualValue) {
                    const current_value = actualValue;
                    return current_value.should.contain(value);
                });
            });
        }).should.notify(next);
});

Then(/^the "([^"]*)" does not contain the text "([^"]*)"$/, function (main_element_name, element_text, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.getText().should.eventually.not.contain(element_text);
            });
        }).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the text for "([^"]*)"$/, function (main_element_index, main_element_name, element_type, element_text, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.getElementAtIndexWithElementType(main_element_selector, main_index, element_type).getText().then(function (retrieved_text) {
                    element_text.toString().should.include(retrieved_text);
                })
            })
        }).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute does not contain the text for "([^"]*)"$/, function (main_element_index, main_element_name, element_type, element_text, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.getElementAtIndexWithElementType(main_element_selector, main_index, element_type).getText().then(function (retrieved_text) {
                    element_text.toString().should.not.include(retrieved_text);
                })
            })
        }).should.notify(next);
});

Then(/^the "([^"]*)" contains the "([^"]*)" text "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function () {
            general.isElementTextPresent(main_element_selector, attribute_type, attribute).should.eventually.be.true.and.notify(next);
        });
});

Then(/^the "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementTextPresent(main_element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the "([^"]*)" text "([^"]*)"$/, function (main_element_index, main_element_name, attribute_type, attribute, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementTextAtIndexPresent(main_index, main_element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
});

Then(/^the "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementAttributePresent(main_element_selector, attribute_type, attribute).should.notify(next);
});

Then(/^the "([^"]*)" contains the "([^"]*)" attributes "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementAttributesPresent(main_element_selector, attribute_type, attribute).should.notify(next);
});

Then(/^the "([^"]*)" does not contain the "([^"]*)" attributes "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementAttributesPresent(main_element_selector, attribute_type, attribute).should.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the "([^"]*)" attribute "([^"]*)"$/, function (main_element_index, main_element_name, attribute_type, attribute, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.checkClassAtIndexIsPresent(main_index, main_element_selector, attribute_type, attribute).should.eventually.be.true.and.notify(next);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"$/, function (main_element_index, main_element_name, attribute_type, attribute, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.checkClassAtIndexIsPresent(main_index, main_element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
});

Then(/^the "([^"]*)" does not contain the "([^"]*)" attribute "([^"]*)"$/, function (main_element_name, attribute_type, attribute, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.isElementAttributePresent(main_element_selector, attribute_type, attribute).should.eventually.be.false.and.notify(next);
});

Then(/^I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)$/, function (count, main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementsToLoad(main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.getElementsCount(main_element_selector).should.eventually.equal(parseInt(count));
            })
        }).should.notify(next);
});

Then(/^I can see more than "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)$/, function (count, main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementsToLoad(main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.isElementsCountGreaterThanExpected(main_element_selector, count).should.eventually.be.true.and.notify(next);
            })
        }).should.notify(next);
});

Then(/^I can see "(\d*)" "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (count, second_element_name, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.getElementsWithinElementAtIndexCount(main_index, main_element_selector, secondary_element_selector).should.eventually.equal(parseInt(count));
            })
        }).should.notify(next);
});

Given(/^I see the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, function (second_element_index, second_element_name, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_index = parseInt(second_element_index) - 1;
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementAtIndexToLoad(main_index, main_element_selector)
        .then(function () {
            return waitFor(() => {
                return general.checkElementAtIndexWithInElementAtIndexDisplayed(secondary_index, secondary_element_selector, main_index, main_element_selector).should.eventually.be.true.and.notify(next);
            })
        }).should.notify(next);
});


When(/^a new tab is opened with the url containing "([^"]*)"$/, function (expectedUrl, next) {
    browsers.myBrowser().sleep(500);
    var myBrowser = browsers.myBrowser();
    browsers.myBrowser().getAllWindowHandles()
        .then(function (windowHandle) {
            windowHandle.length.should.equal(2);
            myBrowser.switchTo().window(windowHandle[1])
                .then(function () {
                    myBrowser.driver.getCurrentUrl().should.eventually.contain(expectedUrl);
                    myBrowser.driver.close().then(function () {
                        browser.switchTo().window(windowHandle[0])
                    })
                });
        }).should.notify(next);

});
