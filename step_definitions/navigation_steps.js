'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');
const current_page = require('../support/page');
const navigation = require('../support/navigation');
const browsers = require('../support/browsers');
const stored_data = require('../support/stored_data');
const helpers = require('../support/helpers');

Given(/^I am on the "([^"]*)" page$/, function (page_name, next) {
    current_page.goto(page_name, next);
});

When(/^I am directed to the "([^"]*)" (?:page|dialog)$/, function (page_name, next) {
    current_page.redirect(page_name, next);
});

When(/^I set the page to "([^"]*)"$/, function (page_name, next) {
    current_page.setPage(page_name);
    next();
});

When(/^I navigate to the "([^"]*)" page$/, function (page_name, next) {
    current_page.setPage(page_name);
    current_page.goto(page_name, next);
});

When(/^I navigate directly to the "([^"]*)" page with the stored "([^"]*)"$/, function (page_name, stored_value, next) {
    var stored_value = stored_data.getData(stored_value);
    browsers.myBrowser().get(navigation.getPageByURL(page_name, helpers.replaceSpace(stored_value)))
    next();
});

Then(/^I see the "([^"]*)" page title$/, function(expectedTitle, next) {
    return browsers.myBrowser().driver.getTitle()
        .then(function(title) {
            return title.should.contain(expectedTitle);
        }).should.notify(next);
});

When(/^the current url contains "([^"]*)"$/, function (expectedUrl, next) {
    browsers.myBrowser().getCurrentUrl().then(function (urlString) {
        urlString.toLowerCase().should.contain(expectedUrl);
    }).then(function () {
        next();
    })
});
