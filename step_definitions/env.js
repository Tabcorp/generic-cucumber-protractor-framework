const path = require('path');
const ROOT_PATH = path.resolve('./');
const {defineSupportCode} = require(ROOT_PATH + '/node_modules/cucumber');

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(60 * 1000);
});