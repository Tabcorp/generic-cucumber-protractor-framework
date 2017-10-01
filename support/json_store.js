var stored_json;

var setJson = function (json) {
    stored_json = json;
};

var getJson = function () {
    return stored_json;
};

var deleteJson = function() {
    stored_json = "";
};

module.exports.setJson = setJson;
module.exports.getJson = getJson;
module.exports.deleteJson = deleteJson;
