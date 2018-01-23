const general = require('../support/general');
const pageObjects = require('../support/pageObjects');

module.exports = function () {


    this.Then(/^I scroll down (\d+)$/, function (scroll_amount, next) {
        general.scrollDown(scroll_amount)
            .then(function () {
                next();
            });
    });

    this.Then(/^I scroll to the bottom of the page$/, function (next) {
        general.scrollToTheBottom()
            .then(function () {
                next();
            });
    });

    this.Then(/^I scroll to the top of the page$/, function (next) {
        general.scrollToTheTop()
            .then(function () {
                next();
            });
    });

    this.Then(/^I scroll down (\d+) within the "([^"]*)"$/, function (scroll_amount, main_element_name, next) {
      const main_element_selector = pageObjects.elementFor(main_element_name);
      general.scrollDownWithinElement(scroll_amount, main_element_selector)
      .then(function () {
        next();
      });
    });

    this.Then(/^I scroll "([^"]*)" element to the bottom of the visible area of the browser window$/, function (main_element_name, next) {
      const main_element_selector = pageObjects.elementFor(main_element_name);
      console.log("Element1: ", main_element_selector);
      general.scrollElementToTheBottom(main_element_selector)
        .then(function () {
          next();
        });
    });

};
