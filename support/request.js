const helpers = require('../support/helpers');
const path = require('path');
const ROOT_PATH = path.resolve('./');

const requestsFor = function () {
    return require(ROOT_PATH + '/e2e/features/definitions/requests/requests.json');
};

const getRequest = function (request_name) {
    var end_point = requestsFor()[request_name];
    return end_point;
};

module.exports.getRequest = getRequest;