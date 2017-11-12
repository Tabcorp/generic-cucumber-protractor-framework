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

    this.Then(/^I scroll down (\d+) within the "([^"]*)"$/, function (scroll_amount, element_name, next) {
      const element_selector = pageObjects.elementFor(element_name);
      general.scrollDownWithinElement(scroll_amount, element_selector)
      .then(function () {
        next();
      });
    });


};
