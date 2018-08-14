'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
var {After, Before} = require(ROOT_PATH + '/node_modules/cucumber');

const stored_data = require('../support/stored_data')
const json_store = require('../support/json_store')

Before(function (scenario, next) {
    var tags = scenario.pickle.tags;
    var browser_type = tags[0].name;
    console.log("Resolution ", browser_type);

    // Be careful - we assume the arguments are in the unusual form [ height, width ]
    function genericResize(args) {
        window.resizeTo(args[1], args[0]);
    }

    browser.params.browser_type = browser_type;
    if (browser_type === "@mobile") {
        var mobileSize = [ parseInt(process.env.MOBILE_UI_HEIGHT) || 375, parseInt(process.env.MOBILE_UI_WIDTH) || 667 ];
        browser.executeScript(genericResize, mobileSize).then(next);
    } else if (browser_type === "@tablet") {
        var tabletSize = [ parseInt(process.env.TABLET_UI_HEIGHT) || 768, parseInt(process.env.TABLET_UI_WIDTH) || 1024 ];
        browser.executeScript(genericResize, tabletSize).then(next);
    } else if (browser_type === "@desktop") {
        var dekstopSize = [ parseInt(process.env.DESKTOP_UI_HEIGHT) || 1200, parseInt(process.env.DESKTOP_UI_WIDTH) || 800 ];
        browser.executeScript(genericResize, desktopSize).then(next);
    }
    else {
        next();
    }
});

// After hook for each scenario
After(function (scenario, next) {
    stored_data.deleteData()
    json_store.deleteJson();
    next();
});
