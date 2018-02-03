'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const pageObjects = require('../support/pageObjects');
const fake_data = require('../support/fake_data');
const helpers = require('../support/helpers');
const faker = require('faker');

Given(/I fill in the "([^"]*)" input with "([^"]*)" fake data$/, function (element_name, value, next) {
    var element_selector = pageObjects.elementFor(element_name);
    var fake_data_value = eval(fake_data.fakerFor(value)) + helpers.randomString(6);
    pageObjects.waitForElementToLoad(element_selector)
        .then(function (current_element) {
            current_element.sendKeys(fake_data_value).then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

