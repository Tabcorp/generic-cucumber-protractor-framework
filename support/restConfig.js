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
            'Accept': '',
            'Content-Type': 'application/json',
            'RequestID': '',
            'ANZ-APPLICATION-ID': '',
            'ANZ-Application-Version': '',
            'Client-IP': '',
            'UserID': '',
            'Accept-Encoding':'',
            'Accept-Language':'',
            'Connection':'',
            'Host': '',
            'If-None-Match':'',
            'User-Agent':''
        },
        body: JSON.stringify(json)
    };
    return response;
};

module.exports.get = get;
module.exports.post = post;