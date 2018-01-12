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

var post = function(json, context) {
    response = {
        method: 'POST',
        url: navigation.getApiRoot(context),
        resolveWithFullResponse: true,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    };
    return response;
};

var del = function(context) {
    response = {
        method: 'DELETE',
        url: navigation.getApiRoot(context),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return response;
}

module.exports.get = get;
module.exports.post = post;
module.exports.del = del;