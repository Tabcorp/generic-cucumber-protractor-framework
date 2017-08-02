const getStepDefinitions = function () {
    const step_definitions = ['../features/custom_steps/*.js', '../../node_modules/generic-cucumber-protractor-framework/step_definitions'];
    return step_definitions
};

module.exports.getStepDefinitions = getStepDefinitions;
