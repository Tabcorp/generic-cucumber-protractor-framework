var page = require('../support/page');
var browsers = require('../support/browsers');
var hotkeys = require('protractor-hotkeys');

module.exports = function() {


    this.Then(/^I press the "([^"]*)" key$/, function (key, next) {
        hotkeys.trigger(key);
        next();
    });

    this.Then(/^I press the "([^"]*)" key I should be directed to the "([^"]*)" page$/, function (key, page_name, next) {
      var current_url = page.getPageURL(page_name);
      page.setPage(page_name);
      hotkeys.trigger(key);
      return browsers.myBrowser().getCurrentUrl().then(function(urlString) {
        urlString.should.contain(current_url);
      }).should.notify(next);
    });

    this.Then(/^I press the enter key I should be directed to the "([^"]*)" page$/, function (page_name, next) {
      var current_url = page.getPageURL(page_name);
      page.setPage(page_name);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      return browsers.myBrowser().getCurrentUrl().then(function(urlString) {
        urlString.should.contain(current_url);
      }).should.notify(next);
    });

}
