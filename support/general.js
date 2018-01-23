const Q = require('q');
const waitFor = require('./waitFor');
const _ = require('lodash');
const pageObjects = require('./pageObjects');
const browsers = require('./browsers');

const getElement = function(main_element_selector) {
    return _.isString(main_element_selector) ? element(this.css(main_element_selector)) : main_element_selector;
};

const byCss = function (selector) {
    return by.css(selector);
};

const cssByDataId = function (data_id) {
    return this.byCss('[data-id="' + data_id + '"]');
};

const css = function (main_element_selector) {
    if (main_element_selector.search(/^(?:[.#])/) >= 0) {
        return this.byCss(main_element_selector);
    }
    return this.cssByDataId(main_element_selector);
};

const hasAttribute = function (element, attribute_type, attribute) {
    return element.getAttribute(attribute_type).then(function (attributes) {
        return attributes.split(' ').indexOf(attribute) !== -1;
    });
};

const hasAttributes = function (element, attribute_type, attribute) {
//  Updated this function to validate multiple attributes
  return element.getAttribute(attribute_type).then(function (attributes) {
    if (attribute.indexOf('|') !== -1) {
      const expected_attributes = attribute.split(/\|/);
      const actual_attributes = attributes.split(/\n/);
      if (expected_attributes.length !== actual_attributes.length) {
        return false;
      }
      return actual_attributes.join(' ').indexOf(expected_attributes.join(' ')) !== -1;
    }
    return attributes.indexOf(attribute) !== -1;
  });
};

const hasText = function (element, attribute_type, text) {
    return element.getAttribute(attribute_type).then(function (attributes) {
        return attributes.indexOf(text) !== -1;
    });
};

const getElements = function (main_element_selector) {
    return element.all(this.css(main_element_selector));
};

const getElementsWithInElementAtIndex = function (secondary_element_selector, main_element_index, main_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    return parent.all(this.css(secondary_element_selector))
};

const findElement = function (main_element_selector) {
    return browser.driver.findElement(this.css(main_element_selector));
};

const getElementByText = function (main_element_selector, text) {
    return element(by.cssContainingText(main_element_selector, text))
}

const getElementByTextAtIndex = function(main_element_selector, index, text) {
    return element.all(by.cssContainingText(main_element_selector, text)).get(index)
};

const getElementAtIndex = function (index, main_element_selector) {
    return this.getElements(main_element_selector).get(index);
};

const getElementAtLastIndex = function(main_element_selector) {
    return this.getElements(main_element_selector).last();
};

const getElementWithinElement = function (main_element_selector, secondary_element_selector) {
    const parent = element(this.css(main_element_selector));
    return parent.element(this.css(secondary_element_selector));
};

const getWithinElementAtIndex = function (index, main_element_selector, secondary_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.element(this.css(secondary_element_selector));
};

const getElementAtIndexWithInElementAtIndex = function(second_element_index, secondary_element_selector, main_element_index, main_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    return parent.all(this.css(secondary_element_selector)).get(second_element_index);
};

const getElementAtIndexWithElementType = function(main_element_selector, index, element_type) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.element(by.css(element_type));
};

const getElementIndexWithElementTypeWithinElementAtIndex = function(main_element_selector, main_element_index, element_type, secondary_element_selector, second_element_index) {
    const parent = element.all(this.css(main_element_selector)).get(main_element_index);
    const child = parent.all(this.css(secondary_element_selector)).get(second_element_index);
    return child.element(by.css(element_type));
};

const isElementTextPresent = function (main_element_selector, attribute_type, text) {
    return this.hasText(this.getElement(main_element_selector), attribute_type, text)
        .then(function (hasText) {
            if (hasText) {
                return true
            } else {
                return false
            }
        });
};

const isElementTextAtIndexPresent = function (index, main_element_selector, attribute_type, text) {
    return this.hasText(this.getElementAtIndex(index, main_element_selector), attribute_type, text)
        .then(function (hasAttributes) {
            if (hasAttributes) {
                return true
            } else {
                return false
            }
        });
};

const getNumberOfElements = function(main_element_selector) {
    return general.getElements(main_element_selector).then(function (elementsList) {
        return elementsList.length;
    });
};

const getElementsCount = function(main_element_selector) {
    return element.all(this.css(main_element_selector)).count();
};

const isElementsCountGreaterThanExpected = function(main_element_selector, expected_count) {
    return element.all(this.css(main_element_selector)).count().then(function (element_count) {
        if (element_count > expected_count) {
            return true
        } else {
            return false
        }
    });
};

const isElementWithinElementContainingTextPresent = function(main_element_selector, main_element_text, secondary_element_selector) {
    const parent = element(by.cssContainingText(main_element_selector, main_element_text));
    return parent.element(this.css(secondary_element_selector)).isPresent();
};

const getElementsWithinElementAtIndexCount = function (index, main_element_selector, secondary_element_selector) {
    const parent = element.all(this.css(main_element_selector)).get(index);
    return parent.all(this.css(secondary_element_selector)).count();
};

const getElementsCountWithInParentElementAtIndex = function (index, main_element_selector, secondary_element_selector) {
    var parent_element = element.all(this.css(main_element_selector)).get(index);
    return parent_element.all(this.css(secondary_element_selector)).count();
};

const checkElementTextAtIndexIsPresent =  function (index, main_element_selector, attribute_type, text) {
    const current_element = element.all(this.css(main_element_selector)).get(index);
    return this.hasText(current_element, attribute_type, text)
        .then(function (hasAttributes) {
            if (hasAttributes) {
                return true
            } else {
                return false
            }
        });
};

const checkElementIsDisplayed = function (main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(main_element_selector);
    return current_element.isDisplayed().should.eventually.be.true;
  });
};

const checkElementIsNotDisplayed = function (main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(main_element_selector);
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
            const current_element = this.getElementAtIndexWithInElementAtIndex(main_index, current_main_element, second_index, current_second_element);
    return current_element.isDisplayed().should.eventually.be.true;
});
};


const checkElementWithinElementIsPresent = function (main_element_selector, secondary_element_selector) {
    return waitFor(() => {
         const current_element = this.getElementWithinElement(main_element_selector, secondary_element_selector);
    return current_element.isPresent().should.eventually.be.true;
});
};

const checkElementAtIndexIsDisplayed = function (index, main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElementAtIndex(index, main_element_selector);
    return current_element.isDisplayed().should.eventually.be.true;
});
};

const checkElementAtIndexIsNotDisplayed = function (index, main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElementAtIndex(index, main_element_selector);
    return current_element.isDisplayed().should.eventually.be.false;
});
};

const checkElementAtIndexIsNotPresent = function (index, main_element_selector) {
    return waitFor(() => {
        const current_element = this.getElementAtIndex(index, main_element_selector);
        return current_element.isPresent().should.eventually.be.false;
    });
};

const checkElementAtIndexIsPresent = function (index, main_element_selector) {
    return waitFor(() => {
        const current_element = this.getElementAtIndex(index, main_element_selector);
        return current_element.isPresent().should.eventually.be.true;
    });
};

const checkElementIsPresent = function (main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(main_element_selector);
    return current_element.isPresent().should.eventually.be.true;
  });
};

const checkElementIsNotPresent = function (main_element_selector) {
    return waitFor(() => {
            const current_element = this.getElement(main_element_selector);
    return current_element.isPresent().should.eventually.be.false;
  });
};

const checkTextAtIndexIsPresent = function (main_element_selector, index) {
    return element.all(this.css(main_element_selector)).get(index);
};

const checkClassAtIndexIsPresent = function (index, main_element_selector, attribute_type, attribute) {
    var parent_element = element.all(this.css(main_element_selector)).get(index);
    return this.hasAttribute(parent_element, attribute_type, attribute)
        .then(function (hasAttributes) {
            return hasAttributes;
        });
};

const isElementAttributePresent = function (main_element_selector, attribute_type, attribute) {
    return waitFor(() => {
            return this.hasAttribute(this.getElement(main_element_selector), attribute_type, attribute).should.eventually.be.true;
  });
};

const isElementAttributesPresent = function (main_element_selector, attribute_type, attribute) {
    return waitFor(() => {
            return this.hasAttributes(this.getElement(main_element_selector), attribute_type, attribute).should.eventually.be.true;
  });
};


const clickElement = function (main_element_selector) {
    return pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                    return current_element.click();
        });
        });
};

const scrollDown = function(scroll_amount) {
    return browsers.myBrowser().executeScript('window.scrollTo(0,'+scroll_amount+');');
};

const scrollDownWithinElement = function(scroll_amount, main_element_selector) {
    return waitFor(() => {
      return browsers.myBrowser()
        .executeScript('document.querySelector("' + main_element_selector + '").scrollTop=' + scroll_amount);
    });
}

const scrollToTheBottom = function() {
    return browsers.myBrowser().executeScript('window.scroll(0, document.body.offsetHeight)');
};

const scrollElementToTheBottom = function(main_element_selector) {
    console.log("Element2: ", main_element_selector);
    console.log("Element3: ", "('." + main_element_selector + "')");
    console.log("Element4: ", "$('." + main_element_selector + "').scrollIntoView(false)");
    return browsers.myBrowser()
        .executeScript('document.querySelector("' + main_element_selector + '").scrollIntoView(false)');
        // .executeScript("$('." + main_element_selector + "').scrollIntoView(false)");

const scrollToTheTop = function() {
    return browsers.myBrowser().executeScript('window.scroll(document.body.offsetHeight, 0)');
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
module.exports.getElementAtIndexWithInElementAtIndex = getElementAtIndexWithInElementAtIndex;
module.exports.getElementAtIndexWithElementType = getElementAtIndexWithElementType;
module.exports.getElementIndexWithElementTypeWithinElementAtIndex = getElementIndexWithElementTypeWithinElementAtIndex;
module.exports.isElementTextAtIndexPresent = isElementTextAtIndexPresent;
module.exports.getNumberOfElements = getNumberOfElements;
module.exports.getElementsCount = getElementsCount;
module.exports.isElementsCountGreaterThanExpected = isElementsCountGreaterThanExpected;
module.exports.isElementWithinElementContainingTextPresent = isElementWithinElementContainingTextPresent;
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
module.exports.checkElementAtIndexIsNotPresent = checkElementAtIndexIsNotPresent;
module.exports.checkElementAtIndexIsPresent = checkElementAtIndexIsPresent;
module.exports.checkElementIsPresent = checkElementIsPresent;
module.exports.checkElementIsNotPresent = checkElementIsNotPresent;
module.exports.checkTextAtIndexIsPresent = checkTextAtIndexIsPresent;
module.exports.checkClassAtIndexIsPresent = checkClassAtIndexIsPresent;
module.exports.isElementAttributePresent = isElementAttributePresent;
module.exports.isElementAttributesPresent = isElementAttributesPresent;
module.exports.clickElement = clickElement;
module.exports.scrollDown = scrollDown;
module.exports.scrollDownWithinElement = scrollDownWithinElement;
module.exports.scrollToTheBottom = scrollToTheBottom;
