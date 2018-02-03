'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

Then(/^I accept( dismiss)? the alert dialog/, function (negate, next) {
    if (negate) {
        browser.switchTo().alert().dismiss();
        next();
    } else {
        browser.switchTo().alert().accept();
        next();
    }
});

