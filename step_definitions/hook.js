const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
var stored_data = require('../support/stored_data')

module.exports = function () {
    // Before hook for each step
    this.Before(function (scenario, next) {
        var tags = scenario.getTags();
        var browser_type = tags[0].getName();

        //set the browser dimensions for the test
        browser.params.browser_type = browser_type;
        if (browser_type === "@mobile") {
            browser.driver.manage().window().setSize(375, 667);
        } else if (browser_type === "@tablet") {
            browser.driver.manage().window().setSize(768, 1024);
        } else if (browser_type === "@desktop") {
            browser.driver.manage().window().setSize(1600, 968);
        }
        next();
    });

    // After hook for each step
    this.After(function (scenario, next) {
        stored_data.deleteData()
        browser.executeScript('window.localStorage.clear();');

        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function(png) {
                var scenario_name = scenario.getName().replace(/\s+/g,"_");
                var failed_scenario_file =  path.join(__dirname, `/../../reporting/screenshots/${scenario_name}.png`);
                mkdirp.sync(path.dirname(failed_scenario_file));
                fs.writeFileSync(failed_scenario_file, png, { encoding: 'base64' }, console.log);
            }, function (err) {
                throw new Error(err);
            });
        }
        next();
    });
};
