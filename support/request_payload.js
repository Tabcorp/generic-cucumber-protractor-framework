const path = require('path');
const ROOT_PATH = path.resolve('./');

const requestPayloadFor = function (requestPayload_type) {
    return require(ROOT_PATH + '/e2e/features/definitions/request_payloads/'+requestPayload_type+'.json');
};

const getRequestPayload = function (requestPayload_type) {
    var requestPayload = requestPayloadFor(requestPayload_type);
    return requestPayload
};

module.exports.getRequestPayload = getRequestPayload;
module.exports.requestPayloadFor = requestPayloadFor;


