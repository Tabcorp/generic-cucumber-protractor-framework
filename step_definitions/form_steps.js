var pageObjects = require('./pageObjects');

module.exports = function () {

  this.Then(/I fill in the "([^"]*)" input with "([^"]*)"$/, function (element_name, value, next) {
    var element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(function (current_element) {
        current_element.clear().sendKeys(value).then(() => {
          next();
        }, (err) => {
          next(err);
        });
      });
  });
}
