var current_page = require("page");
const BASE_URL_TEMPLATE = "http://server:port";

var getBaseUrl = function (route) {
  var baseUrl = BASE_URL_TEMPLATE.replace("server", webServer()).replace("port", webServerPort());
  return `${baseUrl}${route}`;
};

var webServer = function () {
  return process.env.WEB_SERVER || 'localhost';
};

var webServerPort = function () {
  return process.env.WEB_SERVER_PORT || '9000';
};

var elementFor = function (page, page_type) {
  return current_page.pageFor(page)[page_type];
};

var navigation = {
  getPage: function (page) {
    var route = elementFor("pages", page);
    console.log(getBaseUrl(route));
    return getBaseUrl(route);
  },
};

module.exports = navigation;
