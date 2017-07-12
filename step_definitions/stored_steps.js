const pageObjects = require('./pageObjects');
const stored_data = require('./stored_data');
const waitFor = require('./waitFor');

module.exports = function() {


  this.When(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"$/, function (indexText, element_name, name, next) {
    const element_selector = pageObjects.elementFor(element_name);
    const index = parseInt(indexText) - 1;
    pageObjects.waitForElementAtIndexToLoad(index, element_selector)
      .then(function (current_element) {
        return waitFor(() => {
          return current_element.getText().then(function (ui_text) {
            stored_data.setData(name, ui_text);
          })
        })
      }).should.notify(next);
  });

  this.Then(/^the "([^"]*)" contains the stored "([^"]*)"$/, function (element_name, name, next) {
    const element_selector = pageObjects.elementFor(element_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(function (current_element) {
        return waitFor(() => {
          return current_element.getText().then(function (retrieved_text) {
            const retrieved_stored_value = stored_data.getData(name);
            return retrieved_text.toString().should.include(retrieved_stored_value);
          })
        })
      }).should.notify(next);
  });

}
