var navigation = require('../support/navigation')

var get = function(route) {
    response = {
        method: 'GET',
        url: navigation.getApiRoot(route),
        resolveWithFullResponse: true,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return response;

};

module.exports.get = get;