var navigation = require('./navigation');

var tagsForEnvironment = function (suite_tag) {
    switch(navigation.getEnvironment()) {
        case 'localhost':
            var tags = [suite_tag, '~@wip', '~@removed', '~@unreleased'];
            break;
        case 'uat':
            var tags = ['@uat', '~@wip', '~@removed', '~@unreleased'];
            break;
        case 'preprod':
            var tags = ['@preprod', '~@wip', '~@removed', '~@unreleased'];
            break;
        case 'production':
            var tags = ["@production", '~@wip', '~@removed', '~@unreleased'];
            break;
    }
    return tags
};

module.exports.tagsForEnvironment = tagsForEnvironment;
