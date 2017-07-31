const jsonPath = require('JSONPath');

const getJsonFromPath = function (json_path, json_body) {
    return jsonPath.eval(JSON.parse(json_body), json_path);
};

module.exports.getJsonFromPath = getJsonFromPath;