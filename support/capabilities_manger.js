const getBrowserCapabilities = function (browser, browser_arguments, browser_preferences) {

    switch(browser) {
        case 'chrome':
            var browser_capabilities = {
                'browserName': 'chrome',
                // shardTestFiles: true,
                // maxInstances: 4,
                'chromeOptions': {
                    'args': browser_arguments,
                    prefs: browser_preferences
                }
            };
            break;
        case 'firefox':
            var browser_capabilities = {
                'browserName': 'firefox', 
                'marionette': true,
                "moz:firefoxOptions": { 
                    args: browser_arguments
                }
            };
            break;
    };

   return browser_capabilities;

};

module.exports.getBrowserCapabilities = getBrowserCapabilities;
