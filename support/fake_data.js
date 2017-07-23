var pageFor = function () {
    return require('../fake_data/definitions.json');
};

var fakerFor = function (definition) {
    current_faker_defintiion = pageFor()[definition];
    return current_faker_defintiion
};

module.exports.pageFor = pageFor;
module.exports.fakerFor = fakerFor;
