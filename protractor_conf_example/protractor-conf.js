'use strict';

//Firefox and Chrome Browser Preferences
const BROWSER = process.env.BROWSER || 'chrome';
const CHROME_ARGUMENTS = ['-headless', 'disable-web-security=true', '--no-sandbox', '--disable-infobars'];
const CHROME_PREFERENCES = {
    'profile.default_content_setting_values.geolocation': false,
    'profile.password_manager_enabled': false,
    'credentials_enable_service': false,
    'password_manager_enabled': false
};
const FIREEFOX_PREFERENCES = ['-headless'];

const tag_manager = require('../../node_modules/generic-cucumber-protractor-framework/support/tag_manager');
const step_definitions_manager = require('../../node_modules/generic-cucumber-protractor-framework/support/step_definitions_manger');
const browser_capabilities = require('./../../node_modules/generic-cucumber-protractor-framework/support/capabilities_manger');
const PROJECT_TAG = process.env.PROJECT_TAG || '@smoke';
const PROJECT_TAGS = tag_manager.tagsForEnvironment(PROJECT_TAG);
const STEP_DEFINITONS = step_definitions_manager.getStepDefinitions();

//determine required browser preferences
switch(BROWSER) {
    case 'chrome':
        var BROWSER_CAPABILITIES = browser_capabilities.getBrowserCapabilities(BROWSER, CHROME_ARGUMENTS, CHROME_PREFERENCES);
        console.log("Automation running on", BROWSER)
        break;
    case 'firefox':
        var BROWSER_CAPABILITIES = browser_capabilities.getBrowserCapabilities(BROWSER, FIREEFOX_PREFERENCES);
        console.log("Automation running on", BROWSER)
        break;
}

exports.config = {

    useAllAngular2AppRoots: true,
    directConnect: true,
    allScriptsTimeout:20000,

    specs: [
        '../features/vegas/*.feature'
    ],

    capabilities: BROWSER_CAPABILITIES,

    rootElement: 'body',

    onPrepare: function () {
        var chai = require('../../node_modules/generic-cucumber-protractor-framework/node_modules/chai');
        chai.use(require('../../node_modules/generic-cucumber-protractor-framework/node_modules/chai-as-promised'));
        chai.should();

        Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
            get: Object.prototype.__lookupGetter__('should'),
            set: Object.prototype.__lookupSetter__('should')
        });

      var disableNgAnimate = function() {
        angular
          .module('disableNgAnimate', [])
          .run(['$animate', function($animate) {
            $animate.enabled(false);
          }]);
      };

      var disableCssAnimate = function() {
        angular
          .module('disableCssAnimate', [])
          .run(function() {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '* {' +
              '-webkit-transition: none !important;' +
              '-moz-transition: none !important' +
              '-o-transition: none !important' +
              '-ms-transition: none !important' +
              'transition: none !important' +
              '}';
            document.getElementsByTagName('head')[0].appendChild(style);
          });
      };

      browser.addMockModule('disableNgAnimate', disableNgAnimate);
      browser.addMockModule('disableCssAnimate', disableCssAnimate);

      // Minimum app window dimensions (including browser chrome):
      //browser.driver.manage().window().maximize();
      browser.manage().timeouts().pageLoadTimeout(15000);
      browser.manage().timeouts().implicitlyWait(20000);
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        tags: PROJECT_TAGS,
        format: ['./node_modules/generic-cucumber-protractor-framework/node_modules/cucumber-pretty','json:./e2e/features/reports/cucumber_report.json'],
        require: STEP_DEFINITONS
    },


    plugins: [{
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options:{
        // read the options part for more options
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true
      }
    }]

};
