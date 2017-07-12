var current_page = require('./page');

module.exports = function () {
  this.Given(/^I am on the "([^"]*)" page$/, function (page_name, next) {
    current_page.goto(page_name, next);
  });

  this.When(/^I am directed to the "([^"]*)" page$/, function (page_name, next) {
    current_page.redirect(page_name, next);
  });

  this.When(/^I set the page to "([^"]*)"$/, function (page_name, next) {
	  current_page.setPage(page_name);
	  next();
  });

};
