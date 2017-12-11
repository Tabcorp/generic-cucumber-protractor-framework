var navigation = require('./navigation');

var tagsForEnvironment = function (suite_tag) {
    switch(navigation.getEnvironment()) {
        case 'localhost':
            var tags = [suite_tag, '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken'];
            break;
        case 'uat':
            var tags = [suite_tag, '@uat', '~@wip', '~@pending_mock', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken'];
            break;
        case 'preprod':
            var tags = [suite_tag, '@preprod', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken'];
            break;
        case 'production':
            var tags = [suite_tag, '@production', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken'];
            break;
    }
    return tags
};

module.exports.tagsForEnvironment = tagsForEnvironment;
