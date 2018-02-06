const path = require('path');
const ROOT_PATH = path.resolve('./');

const serversFor = function () {
    return require(ROOT_PATH + '/e2e/features/definitions/requests/servers.json');
};

const getAPIServerURL = function (request_name) {
    var end_point = serversFor()[request_name];
    return end_point;
};

module.exports.getAPIServerURL = getAPIServerURL;