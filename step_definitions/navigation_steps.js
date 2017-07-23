var current_page = require('../support/page');
const browsers = require('../support/browsers');

module.exports = function () {
    this.Given(/^I am on the "([^"]*)" page$/, function (page_name, next) {
        current_page.goto(page_name, next);
    });

    this.When(/^I am directed to the "([^"]*)" (?:page|dialog)$/, function (page_name, next) {
        current_page.redirect(page_name, next);
    });

    this.When(/^I set the page to "([^"]*)"$/, function (page_name, next) {
        current_page.setPage(page_name);
        next();
    });

    this.Then(/^I see the "([^"]*)" page title$/, function(expectedTitle, next) {
        return browsers.myBrowser().driver.getTitle()
            .then(function(title) {
                return title.should.contain(expectedTitle);
            }).should.notify(next);
    });

};
