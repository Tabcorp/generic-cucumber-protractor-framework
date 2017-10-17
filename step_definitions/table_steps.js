const pageObjects = require('../support/pageObjects');
const helpers = require('../support/helpers');
const waitFor = require('../support/waitFor');

module.exports = function() {

  this.Then(/^the "([^"]*)" table contains the following:$/, function (table_name, dataTable, next) {
    const element_selector = pageObjects.elementFor(table_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(function(current_element){
        return waitFor(() => {
          return current_element.getText().then(function (text) {
            dataTable.hashes().forEach(function (row) {
              for (const key in row){
                current_text = helpers.replaceLineBreaks(row[key]);
                ui_text = helpers.replaceLineBreaks(text);
                ui_text.should.deep.include(current_text);
              }
            });
          });
        });
      }).should.notify(next);
  });

  this.Then(/^the "([^"]*)" table does not contain the following:$/, function (table_name, dataTable, next) {
    const element_selector = pageObjects.elementFor(table_name);
    pageObjects.waitForElementToLoad(element_selector)
      .then(function(current_element){
        return waitFor(() => {
          return current_element.getText().then(function (text) {
            dataTable.hashes().forEach(function (row) {
              for (const key in row){
                text.should.not.deep.include(row[key]);
              }
            });
          });
        });
      }).should.notify(next);
  });

}
