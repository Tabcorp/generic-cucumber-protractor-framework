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

const getBrowserResolution = function (resolution) {

    switch(resolution) {
        case '@mobile':
            browser_resolution = (process.env.MOBILE_UI_HEIGHT || 375) + ',' + (process.env.MOBILE_UI_WIDTH || 667);
            break;
        case '@tablet':
            var browser_resolution = (process.env.TABLET_UI_HEIGHT || 768) + ',' + (process.env.TABLET_UI_WIDTH || 1024);
            break;
        case '@desktop':
            var browser_resolution = (process.env.DESKTOP_UI_HEIGHT || 1200) + ',' + (process.env.DESKTOP_UI_WIDTH || 800);
            break;
    };

    console.log("Device Resolution Type: "+ resolution, "Browser resolution: "+ browser_resolution);

    return "--window-size="+browser_resolution;
};

module.exports.getBrowserResolution = getBrowserResolution;
module.exports.getBrowserCapabilities = getBrowserCapabilities;

