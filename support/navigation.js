const current_page = require("./page");
const BASE_URL_TEMPLATE = "http://server:port";

var getBaseUrl = function (route) {
    switch(getEnvironment()) {
        case 'local':
            var baseUrl = BASE_URL_TEMPLATE.replace("server", webServer()).replace("port", webServerPort());
            break;
    }
    return `${baseUrl}${route}`;
};

var baseAPIUrl = function (route) {
    switch(getEnvironment()) {
        case 'local':
            var baseAPIUrl = process.env.LOCAL_API_ROUTE || "https://uat2-api.test.sunbets.co.uk/v1/";
            break;
    }
    return `${baseAPIUrl}${route}`;
}

var webServer = function () {
    return process.env.WEB_SERVER || 'localhost';
};

var webServerPort = function () {
    return process.env.WEB_SERVER_PORT || '9000';
};

var elementFor = function (page, page_type) {
    page_type = page_type.replace(/ /g,"_");
    return current_page.pageFor(page)[page_type];
};

const getPage = function (page) {
    var route = elementFor("pages", page);
    console.log(getBaseUrl(route));
    return getBaseUrl(route);
};

const getPageByURL = function(page, stored_value) {
    var new_page = elementFor("pages", page);
    var route = new_page + stored_value;
    return getBaseUrl(route);
};

const getApiRoot = function(route) {
    return baseAPIUrl(route);
};


const getEnvironment = function() {
    var build_environment = process.env.BUILD_ENVIRONMENT || "local";
    return build_environment;
};

module.exports.getPage = getPage;
module.exports.getPageByURL = getPageByURL;
module.exports.getApiRoot = getApiRoot;
module.exports.getEnvironment = getEnvironment;