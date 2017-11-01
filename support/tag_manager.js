var navigation = require('./navigation');

var tagsForEnvironment = function (suite_tag) {
    switch(navigation.getEnvironment()) {
        case 'localhost':
            var tags = [suite_tag, '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS];
            break;
        case 'uat':
            var tags = ['@uat', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS];
            break;
        case 'preprod':
            var tags = ['@preprod', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS];
            break;
        case 'production':
            var tags = ["@production", '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS];
            break;
    }
    return tags
};

module.exports.tagsForEnvironment = tagsForEnvironment;
