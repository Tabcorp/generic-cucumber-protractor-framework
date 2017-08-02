const _ = require('lodash');
const general = require('./general');
const page = require('./page');
const waitFor = require('./waitFor');

const elementFor = function (element_name) {
  const page_name = page.getPage();
  const json_file_name = page_name.replace(/ /g, "_").toLowerCase();
  const common_obj = page.pageFor('common');
  const page_obj = page.pageFor(json_file_name);
  const combined_page_obj = _.extend({}, common_obj, page_obj);
  return combined_page_obj[element_name] || element_name
};

var elementPageFor = function () {
    return require('../definitions//elements.json');
};
const elementTypeFor = function (element_type) {
    return elementPageFor()[element_type];
};

const waitForElementToLoad = function (element_selector) {
  let current_element = null;
  return waitFor(() => {
    current_element = general.getElement(element_selector);
    return current_element.isPresent().should.eventually.be.true;
  }).then(function () {
    return current_element;
  });
};

const waitForElementToBeClickable = function (element_selector) {
    var EC = protractor.ExpectedConditions;
    let current_element = null;
    return waitFor(() => {
            current_element = general.getElement(element_selector);
    return browser.wait(EC.elementToBeClickable(current_element), 5000);
}).then(function () {
        return current_element;
    });
};

const waitForElementsToLoad = function (element_selector) {
    let current_element = null;
    return waitFor(() => {
            current_element = general.getElements(element_selector);
    return current_element.isPresent().should.eventually.be.true;
}).then(function () {
        return current_element;
    });
}

const waitForElementAtIndexToLoad = function (indexText, element_selector) {
  let current_element = null;
  return waitFor(() => {
    current_element = general.getElementAtIndex(indexText, element_selector);
    return current_element.isPresent().should.eventually.be.true;
  }).then(function () {
    return current_element;
  });
};

const waitForElementAtLastIndexToLoad = function (element_selector) {
    let current_element = null;
    return waitFor(() => {
            current_element = general.getElementAtLastIndex(element_selector);
    return current_element.isPresent().should.eventually.be.true;
}).then(function () {
        return current_element;
    });
};

const waitForElementWithTextToLoad = function (element_type, text) {
    let current_element = null;
    return waitFor(() => {
            current_element = general.getElementByText(element_type, text);
    return current_element.isPresent().should.eventually.be.true;
    }).then(function () {
        return current_element;
    });
}

const waitForElementWithTextAtIndexToLoad = function (element_type, index, text) {
    let current_element = null;
    return waitFor(() => {
            current_element = general.getElementByTextAtIndex(element_type, text);
    return current_element.isPresent().should.eventually.be.true;
    }).then(function () {
        return current_element;
    });
};

const waitForElementWithinElementAtIndexToLoad = function (indexText, main_element_selector, secondary_element_selector) {
    let current_element = null;
    return waitFor(() => {
    current_element = general.getWithinElementAtIndex(indexText, main_element_selector, secondary_element_selector);
    return current_element.isPresent().should.eventually.be.true;
    }).then(function () {
          return current_element;
    });
};

const waitForElementHover = function (element_name) {
  return waitFor(() => {
    const current_element = general.getElement(element_name);
    return current_element.isPresent().should.eventually.be.true.then(function () {
      browser.actions().mouseMove(current_element).perform();
    });
  });
};

module.exports.elementFor = elementFor;
module.exports.waitForElementsToLoad = waitForElementsToLoad;
module.exports.waitForElementToBeClickable = waitForElementToBeClickable;
module.exports.elementTypeFor = elementTypeFor;
module.exports.waitForElementToLoad = waitForElementToLoad;
module.exports.waitForElementAtIndexToLoad = waitForElementAtIndexToLoad;
module.exports.waitForElementAtLastIndexToLoad = waitForElementAtLastIndexToLoad;
module.exports.waitForElementWithTextToLoad = waitForElementWithTextToLoad;
module.exports.waitForElementWithTextAtIndexToLoad = waitForElementWithTextAtIndexToLoad;
module.exports.waitForElementWithinElementAtIndexToLoad = waitForElementWithinElementAtIndexToLoad;
module.exports.waitForElementHover = waitForElementHover;
