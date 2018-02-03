'use strict';
var tag_manager = require('../../node_modules/generic-cucumber-protractor-framework/support/tag_manager');
var step_definitions_manager = require('../../node_modules/generic-cucumber-protractor-framework/support/step_definitions_manger');
var PROJECT_TAG = process.env.PROJECT_TAG || '@smoke';
var PROJECT_TAGS = tag_manager.tagsForEnvironment(PROJECT_TAG);
var STEP_DEFINITONS = step_definitions_manager.getStepDefinitions();

exports.config = {

    useAllAngular2AppRoots: true,
    directConnect: true,
    allScriptsTimeout:20000,

    specs: [
        '../features/vegas/*.feature'
    ],

    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['disable-web-security=true', '--no-sandbox', '--disable-infobars'],
        prefs: {
          'profile.default_content_setting_values.geolocation': false,
          'profile.password_manager_enabled': false,
          'credentials_enable_service': false,
          'password_manager_enabled': false
        },
      }
    },

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
