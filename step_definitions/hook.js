const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const stored_data = require('../support/stored_data')
const json_store = require('../support/json_store')
var Q = require('q');

module.exports = function () {

    this.Before(function (scenario, next) {
        var tags = scenario.getTags();
        var browser_type = tags[0].getName();

        //set the browser dimensions for the test
        browser.params.browser_type = browser_type;
        if (browser_type === "@mobile") {
            browser.driver.manage().window().setSize(parseInt(process.env.MOBILE_UI_HEIGHT) || 375, parseInt(process.env.MOBILE_UI_WIDTH) || 667);
        } else if (browser_type === "@tablet") {
            browser.driver.manage().window().setSize(parseInt(process.env.TABLET_UI_HEIGHT) || 768, parseInt(process.env.TABLET_UI_WIDTH) || 1024);
        } else if (browser_type === "@desktop") {
            browser.driver.manage().window().setSize(parseInt(process.env.DESKTOP_UI_HEIGHT) || 1200, parseInt(process.env.DESKTOP_UI_WIDTH) || 800);
        }
        next();
    });

    // After hook for each scenario
    this.After(function (scenario, next) {
        stored_data.deleteData()
        json_store.deleteJson();
        next();
    });
};
