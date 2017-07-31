var page = require('../support/page');
var stored_data = require('../support/stored_data');
var pageObjects = require('../support/pageObjects');
var jsonPath = require('../support/json_path')
var requestPromise = require('request-promise');
var restConfig = require('../support/restConfig');
var request_path = require('../support/request');

module.exports = function() {

    this.Given(/^I retrieve and store the "(.*)" from "([^"]*)" as "([^"]*)"$/, function (json_path, request, store_name, next) {
        const stored_value_name = json_path.split('{').pop().split('}').shift();
        const current_request = request_path.getRequest(request);

        //retrieve stored value based on name between brackets
        if(stored_value_name) {
            const retrieved_stored_value = stored_data.getData(stored_value_name);
            json_path = json_path.replace(/{.*}/, retrieved_stored_value)
        }

        requestPromise(restConfig.get(current_request))
            .then(function (response) {
                response.statusCode.should.equal(200);
                const json_value = jsonPath.getJsonFromPath(json_path, response.body);
                stored_data.setData(store_name, json_value);
                next();
            }).catch(function(err){
            console.log(err);
            next(err);
        })

    });

}