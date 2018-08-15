'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
var {After, Before} = require(ROOT_PATH + '/node_modules/cucumber');

const stored_data = require('../support/stored_data')
const json_store = require('../support/json_store')

// After hook for each scenario
After(function (scenario, next) {
    stored_data.deleteData()
    json_store.deleteJson();
    next();
});
