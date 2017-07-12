var stored_data_map = {};

var setData = function (key, data) {
  stored_data_map[key] = data;
};

var getData = function (key) {
  return stored_data_map[key];
};

var deleteData = function() {
  stored_data_map = {};
};

module.exports.setData = setData;
module.exports.getData = getData;
module.exports.deleteData = deleteData;
