const Q = require('q');
const waitFor = require('./waitFor');
const _ = require('lodash');
const pageObjects = require('./pageObjects');
const browsers = require('./browsers');

const getElement = function(element_selector) {
    return _.isString(element_selector) ? element(this.css(element_selector)) : element_selector;
};

const byCss = function (selector) {
    return by.css(selector);
};

const cssByDataId = function (data_id) {
    return this.byCss('[data-id="' + data_id + '"]');
};

const css = function (element_selector) {
    if (element_selector.search(/^(?:[.#])/) >= 0) {
        return this.byCss(element_selector);
    }
    return this.cssByDataId(element_selector);
};

const hasAttribute = function (element, attribute_type, attribute) {
    return element.getAttribute(attribute_type).then(function (attributes) {
        return attributes.split(' ').indexOf(attribute) !== -1;
    });
};

const hasAttributes = function (element, attribute_type, attribute) {
    return element.getAttribute(attribute_type).then(function (attributes) {
        return attributes.indexOf(attribute) !== -1;
    });
};

const hasText = function (element, attribute_type, text) {
    return element.getAttribute(attribute_type).then(function (attributes) {
        return attributes.indexOf(text) !== -1;
    });
};

const getElements = function (element_selector) {
    return element.all(this.css(element_selector));
};

const findElement = function (element_selector) {
    return browser.driver.findElement(this.css(element_selector));
};

const getElementAtIndex = function (index, element_selector) {
    return this.getElements(element_selector).get(index);
};

const getWithinElementAtIndex = function (index, main_element_selector, secondary_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.element(this.css(secondary_element_selector));
};

const getElementAtIndexWithElementType = function(element_selector, index, element_type) {
    const parent = element.all(by.css('[data-id="'+element_selector+'"]')).get(index);
    return parent.element(by.css(element_type));
};

const checkElementTextAtIndexIsPresent =  function (index, element_selector, attribute_type, text) {
    const current_element = element.all(this.css(element_selector)).get(index);
    return this.hasText(current_element, attribute_type, text)
        .then(function (hasAttributes) {
            if (hasAttributes) {
                return true
            } else {
                return false
            }
        });
};

const checkElementIsDisplayed = function (element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(element_selector);
    return current_element.isDisplayed().should.eventually.be.true;
  });
};

const checkElementIsNotDisplayed = function (element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(element_selector);
    return current_element.isDisplayed().should.eventually.be.false;
  });
};

const checkElementWithinElementAtIndexIsDisplayed = function (index, secondary_element_selector, main_element_selector) {
    return waitFor(() => {
            const current_element = this.getWithinElementAtIndex(index, main_element_selector, secondary_element_selector);
    return current_element.isDisplayed().should.eventually.be.true;
});
};

const checkElementWithinElementAtIndexIsNotDisplayed = function (index, secondary_element_selector, main_element_selector) {
    return waitFor(() => {
            const current_element = this.getWithinElementAtIndex(index, main_element_selector, secondary_element_selector);
    return current_element.isDisplayed().should.eventually.be.false;
});
};

const checkElementAtIndexIsDisplayed = function (index, element_selector) {
    return waitFor(() => {
            const current_element = this.getElementAtIndex(index, element_selector);
    return current_element.isDisplayed().should.eventually.be.true;
});
};

const checkElementAtIndexIsNotDisplayed = function (index, element_selector) {
    return waitFor(() => {
            const current_element = this.getElementAtIndex(index, element_selector);
    return current_element.isDisplayed().should.eventually.be.false;
});
};

const checkElementIsPresent = function (element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(element_selector);
    return current_element.isPresent().should.eventually.be.true;
  });
};

const checkElementIsNotPresent = function (element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(element_selector);
    return current_element.isPresent().should.eventually.be.false;
  });
};

const checkTextAtIndexIsPresent = function (element_selector, index) {
    return element.all(this.css(element_selector)).get(index);
};

const checkClassAtIndexIsPresent = function (index, element_selector, attribute_type, attribute) {
    var parent_element = element.all(this.css(element_selector)).get(index);
    return this.hasAttribute(parent_element, attribute_type, attribute)
        .then(function (hasAttributes) {
            return hasAttributes;
        });
};

const isElementAttributePresent = function (element_selector, attribute_type, attribute) {
    return waitFor(() => {
            return this.hasAttribute(general.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
  });
};

const isElementAttributesPresent = function (element_selector, attribute_type, attribute) {
    return waitFor(() => {
            return this.hasAttributes(general.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
  });
};

const clickElement = function (element_selector) {
    return pageObjects.waitForElementToLoad(element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                    return current_element.click();
        });
        });
};

const scrollDown = function(scroll_amount) {
    return browsers.myBrowser().executeScript('window.scrollTo(0,'+scroll_amount+');');
};

const getNumberOfElements = function(element_selector) {
    return general.getElements(element_selector).then(function (elementsList) {
        return elementsList.length;
    });
};



module.exports.getElement = getElement;
module.exports.byCss = byCss;
module.exports.cssByDataId = cssByDataId;
module.exports.css = css;
module.exports.hasAttribute = hasAttribute;
module.exports.hasAttributes = hasAttributes;
module.exports.hasText = hasText;
module.exports.getElements = getElements;
module.exports.findElement = findElement;
module.exports.getElementAtIndex = getElementAtIndex;
module.exports.getWithinElementAtIndex = getWithinElementAtIndex;
module.exports.getElementAtIndexWithElementType = getElementAtIndexWithElementType;
module.exports.checkElementTextAtIndexIsPresent = checkElementTextAtIndexIsPresent;
module.exports.checkElementIsDisplayed = checkElementIsDisplayed;
module.exports.checkElementIsNotDisplayed = checkElementIsNotDisplayed;
module.exports.checkElementWithinElementAtIndexIsDisplayed = checkElementWithinElementAtIndexIsDisplayed;
module.exports.checkElementWithinElementAtIndexIsNotDisplayed = checkElementWithinElementAtIndexIsNotDisplayed;
module.exports.checkElementAtIndexIsDisplayed = checkElementAtIndexIsDisplayed;
module.exports.checkElementAtIndexIsNotDisplayed = checkElementAtIndexIsNotDisplayed;
module.exports.checkElementIsPresent = checkElementIsPresent;
module.exports.checkElementIsNotPresent = checkElementIsNotPresent;
module.exports.checkTextAtIndexIsPresent = checkTextAtIndexIsPresent;
module.exports.checkClassAtIndexIsPresent = checkClassAtIndexIsPresent;
module.exports.isElementAttributePresent = isElementAttributePresent;
module.exports.isElementAttributesPresent = isElementAttributesPresent;
module.exports.clickElement = clickElement;
module.exports.scrollDown = scrollDown;
module.exports.getNumberOfElements = getNumberOfElements;