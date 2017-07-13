const Q = require('q');
const waitFor = require('./waitFor');
const _ = require('lodash');
const pageObjects = require('./pageObjects');
const browsers = require('./browsers');

const general = {
  byCss: function (selector) {
    return by.css(selector);
  },

  cssByDataId: function (data_id) {
    return this.byCss('[data-id="' + data_id + '"]');
  },

  css: function (element_selector) {
    if (element_selector.search(/^(?:[.#])/) >= 0) {
      return this.byCss(element_selector);
    }
    return this.cssByDataId(element_selector);
  },

  hasAttribute(element, attribute_type, attribute) {
    return element.getAttribute(attribute_type).then(function (attributes) {
      return attributes.split(' ').indexOf(attribute) !== -1;
    });
  },

  hasAttributes(element, attribute_type, attribute) {
    return element.getAttribute(attribute_type).then(function (attributes) {
      return attributes.indexOf(attribute) !== -1;
    });
  },

  hasText(element, attribute_type, text) {
    return element.getAttribute(attribute_type).then(function (attributes) {
      return attributes.indexOf(text) !== -1;
    });
  },

  getElement(element_selector) {
    return _.isString(element_selector) ? element(this.css(element_selector)) : element_selector;
  },

  getElements(element_selector) {
    return element.all(this.css(element_selector));
  },

  findElement(element_selector) {
    return browser.driver.findElement(this.css(element_selector));
  },

  getElementAtIndex(index, element_selector) {
    return this.getElements(element_selector).get(index);
  },

  getWithinElementAtIndex(parent_element, child_element, index) {
    const parent = element.all(this.css(parent_element)).get(index);
    return parent.element(this.css(child_element));
  },

  checkElementTextAtIndexIsPresent: function (index, element_selector, attribute_type, text) {
    const current_element = element.all(this.css(element_selector)).get(index);
    return this.hasText(current_element, attribute_type, text)
      .then(function (hasAttributes) {
        if (hasAttributes) {
          return true
        } else {
          return false
        }
      });
  },

  checkElementIsDisplayed(element_selector) {
    return waitFor(() => {
      const current_element = this.getElement(element_selector);
      return current_element.isDisplayed().should.eventually.be.true;
    });
  },

  checkElementIsNotDisplayed(element_selector) {
    return waitFor(() => {
      const current_element = this.getElement(element_selector);
      return current_element.isDisplayed().should.eventually.be.false;
    });
  },

  checkElementIsPresent(element_selector) {
    return waitFor(() => {
      const current_element = this.getElement(element_selector);
      return current_element.isPresent().should.eventually.be.true;
    });
  },

  checkElementIsNotPresent(element_selector) {
    return waitFor(() => {
      const current_element = this.getElement(element_selector);
      return current_element.isPresent().should.eventually.be.false;
    });
  },

  checkTextAtIndexIsPresent(element_selector, index) {
    return element.all(this.css(element_selector)).get(index);
  },

  checkClassAtIndexIsPresent(index, element_selector, attribute_type, attribute) {
    var parent_element = element.all(this.css(element_selector)).get(index);
    return this.hasAttribute(parent_element, attribute_type, attribute)
      .then(function (hasAttributes) {
        return hasAttributes;
      });
  },

  isElementAttributePresent(element_selector, attribute_type, attribute) {
    return waitFor(() => {
      return this.hasAttribute(general.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
    });
  },

  isElementAttributesPresent(element_selector, attribute_type, attribute) {
    return waitFor(() => {
      return this.hasAttributes(general.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
    });
  },

  clickElement(element_selector) {
    return pageObjects.waitForElementToLoad(element_selector)
      .then(function (current_element) {
        return waitFor(() => {
          return current_element.click();
        });
      });
  },

  scrollDown : function(scroll_amount) {
    return browsers.myBrowser().executeScript('window.scrollTo(0,'+scroll_amount+');');
  },

  getNumberOfElements(element_selector) {
    return general.getElements(element_selector).then(function (elementsList) {
      return elementsList.length;
    });
  }
};

module.exports = general;
