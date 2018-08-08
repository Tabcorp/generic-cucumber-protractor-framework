'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const pageObjects = require('../support/pageObjects');
const helpers = require('../support/helpers');
const waitFor = require('../support/waitFor');

Then(/^the "([^"]*)" table contains the following:$/, function (main_element_name, dataTable, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function(current_element){
            return waitFor(() => {
                return current_element.getText().then(function (text) {
                    dataTable.hashes().forEach(function (row) {
                        for (const key in row){
                            var current_text = helpers.replaceLineBreaks(row[key]);
                            var ui_text = helpers.replaceLineBreaks(text);
                            ui_text.should.deep.include(current_text);
                        }
                    });
                });
            });
        }).should.notify(next);
});

Then(/^the "([^"]*)" table does not contain the following:$/, function (main_element_name, dataTable, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
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

Then(/^the "([^"]*)" table has the following:$/, function (main_element_name, dataTable, next) {
    console.log("TABLE TIME!!!");

    const main_element_selector = pageObjects.elementFor(main_element_name);
    const cucumber_values = dataTable.raw();
    const cucumber_table_headers = cucumber_values[0];
    const cucumber_table_rows = cucumber_values.length - 1;
    const table_values = [];

    console.log(main_element_selector)

    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function(){
            var rowDfs = [];
            for (var i = 1; i < cucumber_table_rows + 1; i++) {
                rowDfs[i] = Q.defer();
            }

            console.log("part 1")
            var promises = rowDfs.map(function(df) {return df.promise});
            cucumber_table_headers.forEach(function(cucumber_header, cucumber_header_index) {
                var parent = element(by.css("[data-id='" + table_element + "']"));
                promises.push(parent.all(by.repeater("tr")).each(function (row, index) {
                    index = index + 1;
                    if (index > cucumber_table_rows) return false;
                    row.$$("td").getText().then(function (value) {
                        return table_values.push(value);
                    }).then(function () {
                        if (index === 0) return;
                        var expected_table_values = table_values[index -1];
                        var expected_cucumber_values = cucumber_values[index];
                        try {
                            // console.error('>>> expected', helpers.cleanArray(expected_table_values));
                            // console.error('>>> actual', expected_cucumber_values[cucumber_header_index]);
                            helpers.cleanArray(expected_table_values).should.deep.include(expected_cucumber_values[cucumber_header_index]);
                            rowDfs[index].resolve();
                        } catch(err) {
                            console.error('err', err);
                            rowDfs[index].reject(err);
                            throw err;
                        }
                    });
                }));
            });

            Q.all(promises).then(function () {
                browser.sleep(2000);
                next();
            }, function(err) {
                browser.sleep(2000);
                next(err);
            })
        });

});

