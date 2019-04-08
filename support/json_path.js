const jsonPath = require('jsonpath');

const getJsonFromPath = function (json_path, json_body) {
    return jsonPath.query(JSON.parse(json_body), json_path);
};

module.exports.getJsonFromPath = getJsonFromPath;