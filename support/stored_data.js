var stored_data_map = {};
var stored_data_array = new Array;

var setData = function (key, data) {
  stored_data_map[key] = data;
};

var getData = function (key) {
  return stored_data_map[key];
};

var deleteData = function() {
  stored_data_map = {};
};

var setDataArray = function (data) {
    stored_data_array.push(data)
};

var getDataArray = function () {
    return cleanArray(stored_data_array);
};

function cleanArray(actual){
    var newArray = new Array();
    for(var i = 0; i<actual.length; i++){
        if (actual[i] && actual[i].length > 0){
            newArray.push(actual[i]);
        }
    }
    return newArray;
}


module.exports.setData = setData;
module.exports.getData = getData;
module.exports.deleteData = deleteData;
module.exports.setDataArray = setDataArray;
module.exports.getDataArray = getDataArray;
module.exports.cleanArray = cleanArray;