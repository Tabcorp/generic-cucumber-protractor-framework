const path = require('path');
const ROOT_PATH = path.resolve('./');

const requestsFor = function () {
    return require(ROOT_PATH + '/e2e/features/definitions/requests/requests.json');
};

const getRequestURL = function (request_name) {
    var end_point = requestsFor()[request_name];
    return end_point;
};

const updateRequest = function(request) {
    var date = new Date();
    var end_date = date.getTime() - 24 * 360 * 1000;
    var start_date = date.getTime() - 5 * 24 * 360 * 1000;
    var later_start_date = date.getTime() + 5 * 360 * 1000;
    var later_end_date = date.getTime() + 24 * 24 * 360 * 10000;

    updated_offer_json = JSON.stringify(request)
        .replace(/"{start-date}"/g, start_date)
        .replace(/"{end-date}"/g, end_date)
        .replace(/"{later-start-date}"/g, later_start_date)
        .replace(/"{later-end-date}"/g, later_end_date);

    return updated_offer_json;
};

module.exports.getRequestURL = getRequestURL;
module.exports.updateRequest = updateRequest;