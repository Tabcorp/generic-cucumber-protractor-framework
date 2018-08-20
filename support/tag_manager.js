var navigation = require('./navigation');

var tagsForEnvironment = function (browser_tag, suite_tag) {

    switch(navigation.getEnvironment()) {
        case 'uat':
            var tags = tagsForBrowser(browser_tag);
            tags.push(...[ suite_tag, '@uat', '~@wip', '~@pending_mock', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken']);
            break;
        case 'preprod':
            var tags = tagsForBrowser(browser_tag);
            tags.push(...[ suite_tag, '@preprod', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken']);
            break;
        case 'production':
            var tags = tagsForBrowser(browser_tag);
            tags.push(...[ suite_tag, '@production', '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken']);
            break;
        default:
            var tags = tagsForBrowser(browser_tag);
            tags.push(...[ suite_tag, '~@wip', '~@removed', '~@unreleased', process.env.SPECIAL_EXCLUDED_TAGS || '~@broken']);
            break;
    }

    console.log("executing the following scenario tags: ", tags);

    return tags
};


var tagsForBrowser = function(browser_tag) {
    let tags = '~@desktop,~@mobile,~@tablet';
    let position = tags.indexOf(browser_tag);
    let current_tags = tags.slice(0, position - 1) + tags.slice(position, tags.length);
    return current_tags.split(",")
};


module.exports.tagsForEnvironment = tagsForEnvironment;
