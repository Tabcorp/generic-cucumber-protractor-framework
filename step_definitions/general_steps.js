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

  this.When(/^I click the "([^"]*)"$/, function (element_name, next) {
    const element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(function (current_element) {
        return waitFor(() => {
          current_element.click()
        })
      }).should.notify(next);
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

  this.When(/^I click the "([^"]*)" button within the "([^"]*)" "([^"]*)"$/, function (element_name, indexText, main_element, next) {
    const parent_element_selector = pageObjects.elementFor(main_element);
    const child_element_selector = pageObjects.elementFor(element_name);
    const index = helpers.convertTextToNumber(indexText);
    pageObjects.waitForElementToLoad(parent_element_selector)
      .then(function () {
        general.getWithinElementAtIndex(parent_element_selector, child_element_selector, index).click().then(function () {
          next();
        }, function (err) {
          return next(err)
        });
      });
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

  this.Then(/^I click the "([^"]*)" (?:button|link|icon|element)$/, function (element_name, next) {
    const element_selector = pageObjects.elementFor(element_name);
    general.clickElement(element_selector).should.notify(next);
  });

  this.Then(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, function (indexText, button, next) {
    const index = parseInt(indexText) - 1;
    const element_selector = pageObjects.elementFor(button);
    pageObjects.waitForElementToLoad(element_selector)
      .then(() => general.getElementAtIndex(index, element_selector).click())
      .should.notify(next);
  });

  this.Then(/^I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)$/, function (num, element_name, next) {
    const element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(() => {
        waitFor(() => {
          return general.getNumberOfElements(element_selector).should.eventually.equal(parseInt(num));
        }).should.notify(next)
      });
  });


  this.Then(/^I scroll down (\d+)$/, function (scroll_amount, next) {
    general.scrollDown(scroll_amount)
      .then(function () {
        next();
      });
  });


};
