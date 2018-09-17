const getBrowserCapabilities = function (browser, browser_arguments, browser_preferences) {

    switch(browser) {
        case 'chrome':
            var browser_capabilities = chromeBrowserCapabilities(browser_arguments, browser_preferences);
            break;
        case 'firefox':
            var browser_capabilities = firefoxBrowserCapabilities(browser_arguments);
            break;
        default:
            var browser_capabilities = chromeBrowserCapabilities(browser_arguments, browser_preferences);
            break;
    };

   return browser_capabilities;

};

const chromeBrowserCapabilities = function (browser_arguments, browser_preferences) {
    return browser_capabilities = {
        'browserName': 'chrome',
        // shardTestFiles: true,
        // maxInstances: 4,
        'chromeOptions': {
            'args': browser_arguments,
            prefs: browser_preferences
        }
    };
};

const firefoxBrowserCapabilities = function (browser_arguments) {
    return browser_capabilities = {
        'browserName': 'firefox',
        'marionette': true,
        "moz:firefoxOptions": {
            args: browser_arguments
        }
    };
};

module.exports.getBrowserCapabilities = getBrowserCapabilities;

