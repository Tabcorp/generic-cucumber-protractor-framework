var current_user;
const path = require('path');
const ROOT_PATH = path.resolve('./');

var setCurrentUser = function (user) {
    current_user = user;
};

var usersFor = function (user_name) {
    return require(ROOT_PATH + '/e2e/features/definitions/users/'+user_name+'.json');
};

var getUser = function (user_name) {
    var user = usersFor(user_name);
    return user
};

module.exports.usersFor = usersFor;
module.exports.setCurrentUser = setCurrentUser;
module.exports.getUser= getUser;
