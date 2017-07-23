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

const waitForElementToLoad = function (element_selector) {
  let current_element = null;
  return waitFor(() => {
    current_element = general.getElement(element_selector);
    return current_element.isPresent().should.eventually.be.true;
  }).then(function () {
    return current_element;
  });
};

const waitForElementAtIndexToLoad = function (indexText, element_selector) {
  let current_element = null;
  return waitFor(() => {
    current_element = general.getElementAtIndex(indexText, element_selector);
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
module.exports.waitForElementToLoad = waitForElementToLoad;
module.exports.waitForElementAtIndexToLoad = waitForElementAtIndexToLoad;
module.exports.waitForElementWithinElementAtIndexToLoad = waitForElementWithinElementAtIndexToLoad;
module.exports.waitForElementHover = waitForElementHover;
