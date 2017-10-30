const current_page = require("./page");
const BASE_URL_TEMPLATE = "http://server:port";

const getBaseUrl = function (route) {
    switch(getEnvironment()) {
        case 'localhost':
            var baseUrl = BASE_URL_TEMPLATE.replace("server", webServer()).replace("port", webServerPort());
            break;
        case 'uat':
            var baseUrl = process.env.UAT_UI_ROUTE;
            break;
        case 'preprod':
            var baseUrl = process.env.PREPROD_UI_ROUTE;
            break;
        case 'production':
            var baseUrl = process.env.PRODUCTION_UI_ROUTE;
            break;
    }
    return `${baseUrl}${route}`;
};

var baseAPIUrl = function (route) {
    switch(getEnvironment()) {
        case 'localhost':
            var baseAPIUrl = process.env.LOCAL_API_ROUTE;
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

const elementFor = function (page, page_type) {
    page_type = page_type.replace(/ /g,"_");
    return current_page.pageFor(page)[page_type];
};

const getPage = function (page) {
    var route = elementFor("pages", page);
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
    var web_server = process.env.WEB_SERVER || "localhost";
    return web_server;
};

module.exports.getBaseUrl = getBaseUrl;
module.exports.elementFor = elementFor;
module.exports.getPage = getPage;
module.exports.getPageByURL = getPageByURL;
module.exports.getApiRoot = getApiRoot;
module.exports.getEnvironment = getEnvironment;