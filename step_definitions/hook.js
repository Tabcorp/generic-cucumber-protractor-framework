const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function () {
  // Before hook for each step
  this.Before(function (scenario, next) {
    next();
  });

  // After hook for each step
  this.After(function (scenario, next) {
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
