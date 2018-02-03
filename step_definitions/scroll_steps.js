'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const general = require('../support/general');
const pageObjects = require('../support/pageObjects');


Then(/^I scroll down (\d+)$/, function (scroll_amount, next) {
    general.scrollDown(scroll_amount)
        .then(function () {
            next();
        });
});

Then(/^I scroll to the bottom of the page$/, function (next) {
    general.scrollToTheBottom()
        .then(function () {
            next();
        });
});

Then(/^I scroll to the top of the page$/, function (next) {
    general.scrollToTheTop()
        .then(function () {
            next();
        });
});

Then(/^I scroll down (\d+) within the "([^"]*)"$/, function (scroll_amount, main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    general.scrollDownWithinElement(scroll_amount, main_element_selector)
        .then(function () {
            next();
        });
});


