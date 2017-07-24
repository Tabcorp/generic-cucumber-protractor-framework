hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
};

cleanArray = function (array) {
  const clean_line_breaks_array = array.map(function (x) {
    return x.replace(/\n/g, " ")
  });
  const cleaned_array = clean_line_breaks_array.map(function (x) {
    return x.replace(/\\/g, "")
  });
  return cleaned_array
};

replaceSpace = function (string) {
    return string.replace(" ","");
};

randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports.hasClass = hasClass;
module.exports.cleanArray = cleanArray;
module.exports.replaceSpace = replaceSpace;
module.exports.randomString = randomString;