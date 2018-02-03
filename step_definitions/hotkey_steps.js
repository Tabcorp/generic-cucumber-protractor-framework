'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

var page = require('../support/page');
var browsers = require('../support/browsers');
var hotkeys = require('protractor-hotkeys');


Then(/^I press the "([^"]*)" key$/, function (key, next) {
    hotkeys.trigger(key);
    next();
});

Then(/^I press the "([^"]*)" key I should be directed to the "([^"]*)" page$/, function (key, page_name, next) {
    var current_url = page.getPageURL(page_name);
    page.setPage(page_name);
    hotkeys.trigger(key);
    return browsers.myBrowser().getCurrentUrl().then(function(urlString) {
        urlString.should.contain(current_url);
    }).should.notify(next);
});

Then(/^I press the enter key I should be directed to the "([^"]*)" page$/, function (page_name, next) {
    var current_url = page.getPageURL(page_name);
    page.setPage(page_name);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    return browsers.myBrowser().getCurrentUrl().then(function(urlString) {
        urlString.should.contain(current_url);
    }).should.notify(next);
});

