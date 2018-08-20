'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
var {After, Before} = require(ROOT_PATH + '/node_modules/cucumber');

const stored_data = require('../support/stored_data');
const json_store = require('../support/json_store');

Before(function (scenario, next) {
    var tags = scenario.pickle.tags;
    var browser_type = tags[0].name
    console.log("Resolution ", browser_type);
    //set the browser dimensions for the test
    browser.params.browser_type = browser_type;
    if (browser_type === "@mobile") {
        browser.driver.manage().window().setSize(parseInt(process.env.MOBILE_UI_HEIGHT) || 375, parseInt(process.env.MOBILE_UI_WIDTH) || 667).then(next);
    } else if (browser_type === "@tablet") {
        browser.driver.manage().window().setSize(parseInt(process.env.TABLET_UI_HEIGHT) || 768, parseInt(process.env.TABLET_UI_WIDTH) || 1024).then(next);
    } else if (browser_type === "@desktop") {
        browser.driver.manage().window().setSize(parseInt(process.env.DESKTOP_UI_HEIGHT) || 1200, parseInt(process.env.DESKTOP_UI_WIDTH) || 800).then(next);
    } else {
        next();
    }
});

// After hook for each scenario
After(function (scenario, next) {
    stored_data.deleteData();
    json_store.deleteJson();
    next();
});
