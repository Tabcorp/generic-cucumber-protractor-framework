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

const getElementsWithInElementAtIndex = function (secondary_element_selector, main_element_index, main_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    return parent.all(this.css(secondary_element_selector))
};

const findElement = function (element_selector) {
    return browser.driver.findElement(this.css(element_selector));
};

const getElementByText = function (element_selector, text) {
    return element(by.cssContainingText(element_selector, text))
}

const getElementByTextAtIndex = function(element_selector, index, text) {
    return element.all(by.cssContainingText(element_selector, text)).get(index)
};

const getElementAtIndex = function (index, element_selector) {
    return this.getElements(element_selector).get(index);
};

const getElementAtLastIndex = function(element_selector) {
    return this.getElements(element_selector).last();
};

const getElementWithinElement = function (main_element_selector, secondary_element_selector) {
    const parent = element(this.css(main_element_selector));
    return parent.element(this.css(secondary_element_selector));
};

const getWithinElementAtIndex = function (index, main_element_selector, secondary_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.element(this.css(secondary_element_selector));
};

const getElementAtIndexWithInElementAtIndexDisplayed = function(second_element_index, secondary_element_selector, main_element_index, main_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    return parent.all(this.css(secondary_element_selector)).get(second_element_index);
};

const getElementAtIndexWithElementType = function(element_selector, index, element_type) {
    const parent = element.all(this.css(element_selector)).get(index);
    return parent.element(by.css(element_type));
};

const getElementIndexWithElementTypeWithinElementAtIndex = function(main_element_selector, main_element_index, element_type, secondary_element_selector, second_element_index) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    const child = parent.all(this.css(secondary_element_selector)).get(second_element_index);
    return child.element(by.css(element_type));
};

const isElementTextPresent = function (element_selector, attribute_type, text) {
    return this.hasText(this.getElement(element_selector), attribute_type, text)
        .then(function (hasText) {
            if (hasText) {
                return true
            } else {
                return false
            }
        });
};

const isElementTextAtIndexPresent = function (index, element_selector, attribute_type, text) {
    return this.hasText(this.getElementAtIndex(index, element_selector), attribute_type, text)
        .then(function (hasAttributes) {
            if (hasAttributes) {
                return true
            } else {
                return false
            }
        });
};

const getNumberOfElements = function(element_selector) {
    return general.getElements(element_selector).then(function (elementsList) {
        return elementsList.length;
    });
};

const getElementsCount = function(element_selector) {
    return element.all(this.css(element_selector)).count();
};

const getElementsWithinElementAtIndexCount = function (index, main_element_selector, secondary_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.all(this.css(secondary_element_selector)).count();
};

const getElementsCountWithInParentElementAtIndex = function (index, main_element_selector, secondary_element_selector) {
    var parent_element = element.all(this.css(main_element_selector)).get(index);
    return parent_element.all(this.css(secondary_element_selector)).count();
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

const checkElementAtIndexWithInElementAtIndexDisplayed = function(main_index, current_main_element, second_index, current_second_element) {
    return waitFor(() => {
            const current_element = this.getElementAtIndexWithInElementAtIndexDisplayed(main_index, current_main_element, second_index, current_second_element);
    return current_element.isDisplayed().should.eventually.be.true;
});
};


const checkElementWithinElementIsPresent = function (main_element_selector, secondary_element_selector) {
    return waitFor(() => {
         const current_element = this.getElementWithinElement(main_element_selector, secondary_element_selector);
    return current_element.isPresent().should.eventually.be.true;
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
            return this.hasAttribute(this.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
  });
};

const isElementAttributesPresent = function (element_selector, attribute_type, attribute) {
    return waitFor(() => {
            return this.hasAttributes(this.getElement(element_selector), attribute_type, attribute).should.eventually.be.true;
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


module.exports.getElement = getElement;
module.exports.byCss = byCss;
module.exports.cssByDataId = cssByDataId;
module.exports.css = css;
module.exports.hasAttribute = hasAttribute;
module.exports.hasAttributes = hasAttributes;
module.exports.hasText = hasText;
module.exports.getElements = getElements;
module.exports.getElementsWithInElementAtIndex = getElementsWithInElementAtIndex;
module.exports.findElement = findElement;
module.exports.getElementByText = getElementByText;
module.exports.getElementByTextAtIndex = getElementByTextAtIndex;
module.exports.getElementWithinElement = getElementWithinElement;
module.exports.getElementAtIndex = getElementAtIndex;
module.exports.getElementAtLastIndex = getElementAtLastIndex;
module.exports.getWithinElementAtIndex = getWithinElementAtIndex;
module.exports.getElementAtIndexWithInElementAtIndexDisplayed = getElementAtIndexWithInElementAtIndexDisplayed;
module.exports.getElementAtIndexWithElementType = getElementAtIndexWithElementType;
module.exports.getElementIndexWithElementTypeWithinElementAtIndex = getElementIndexWithElementTypeWithinElementAtIndex;
module.exports.isElementTextAtIndexPresent = isElementTextAtIndexPresent;
module.exports.getNumberOfElements = getNumberOfElements;
module.exports.getElementsCount = getElementsCount;
module.exports.getElementsWithinElementAtIndexCount = getElementsWithinElementAtIndexCount;
module.exports.getElementsCountWithInParentElementAtIndex = getElementsCountWithInParentElementAtIndex;
module.exports.isElementTextPresent = isElementTextPresent;
module.exports.checkElementTextAtIndexIsPresent = checkElementTextAtIndexIsPresent;
module.exports.checkElementIsDisplayed = checkElementIsDisplayed;
module.exports.checkElementIsNotDisplayed = checkElementIsNotDisplayed;
module.exports.checkElementWithinElementAtIndexIsDisplayed = checkElementWithinElementAtIndexIsDisplayed;
module.exports.checkElementWithinElementAtIndexIsNotDisplayed = checkElementWithinElementAtIndexIsNotDisplayed;
module.exports.checkElementAtIndexWithInElementAtIndexDisplayed = checkElementAtIndexWithInElementAtIndexDisplayed;
module.exports.checkElementWithinElementIsPresent = checkElementWithinElementIsPresent;
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