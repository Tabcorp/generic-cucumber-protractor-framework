'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
var {After, Before} = require(ROOT_PATH + '/node_modules/cucumber');

const stored_data = require('../support/stored_data');
const json_store = require('../support/json_store');

const BROWSER_WINDOW = Object.freeze({
    MOBILE_WIDTH: process.env.MOBILE_UI_WIDTH || 375,
    MOBILE_HEIGHT: process.env.MOBILE_UI_HEIGHT || 667,
    TABLET_WIDTH: process.env.TABLET_UI_WIDTH || 1024,
    TABLET_HEIGHT: process.env.TABLET_UI_HEIGHT || 768,
    DESKTOP_WIDTH: process.env.DESKTOP_UI_WIDTH || 1200,
    DESKTOP_HEIGHT: process.env.DESKTOP_UI_HEIGHT || 800,
    SCREENSHOT_HEIGHT: process.env.SCREENSHOT_UI_HEIGHT || 7000
});

const setWindowSize = function (width, height, callback) {
    browser.driver.manage().window().setSize(parseInt(width), parseInt(height)).then(callback);
};

Before(function (scenario, next) {
    const tags          = scenario.pickle.tags.map(tag => tag.name);
    const isMobile      = tags.includes('@mobile');
    const isTablet      = tags.includes('@tablet');
    const isDesktop     = tags.includes('@desktop');
    const isScreenshot  = tags.includes('@Screenshot');
    if (isMobile) {
        setWindowSize(BROWSER_WINDOW.MOBILE_WIDTH, BROWSER_WINDOW.DESKTOP_HEIGHT, next);
    } else if (isTablet) {
        setWindowSize(BROWSER_WINDOW.TABLET_WIDTH, BROWSER_WINDOW.TABLET_HEIGHT, next);
    } else if (isDesktop) {
        if (isScreenshot) {
            const browserWindow = browser.driver.manage().window();
            browserWindow.maximize().then(function () {
              browserWindow.getSize().then(function (size) {
                setWindowSize(size.width, BROWSER_WINDOW.SCREENSHOT_HEIGHT, next);
              })
            });
        } else {
          setWindowSize(BROWSER_WINDOW.DESKTOP_WIDTH, BROWSER_WINDOW.DESKTOP_HEIGHT, next);
        }
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
