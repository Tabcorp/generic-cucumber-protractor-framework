var navigation = require('./navigation');

var tagsForEnvironment = function (suite_tag) {
    switch(navigation.getEnvironment()) {
        case 'localhost':
            var tags = [suite_tag, '~@wip'];
            break;
        case 'production':
            var tags = [suite_tag, '~@wip'];
            break;
    }
    return tags
};

module.exports.tagsForEnvironment = tagsForEnvironment;
