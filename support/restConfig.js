var navigation = require('../support/navigation')

var get = function(route, server_name) {
    response = {
        method: 'GET',
        url: navigation.getApiRoot(route, server_name),
        resolveWithFullResponse: true,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return response;
};

var post = function(json, context, server_name) {
    console.log(JSON.stringify(json))
    response = {
        method: 'POST',
        url: navigation.getApiRoot(context, server_name),
        resolveWithFullResponse: true,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    };
    return response;
};

var del = function(context, server_name) {
    response = {
        method: 'DELETE',
        url: navigation.getApiRoot(context, server_name),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return response;
}

module.exports.get = get;
module.exports.post = post;
module.exports.del = del;