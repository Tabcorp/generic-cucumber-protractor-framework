const Q = require('q');
const general = require('./general');
const navigation = require('./navigation');
const waitFor = require('./waitFor');
const pageObjects = require('./pageObjects');
const path = require('path');
const ROOT_PATH = path.resolve('./');
let current_page;

const pageTitle = function (page = current_page) {
  const deferred = Q.defer();
  const {title} = pageObjects.elementFor('_at');
  if (title) {
    const titleElementName = pageObjects.elementFor('title');
    const titleElement = general.getElement(titleElementName);
    pageObjects.waitForElementToLoad(titleElement)
      .then(function () {
        return titleElement.getText().should.eventually.contain(title);
      }, function (err) {
        deferred.reject(`No attribute data-id="${titleElementName}" for page "${page}"`);
      }).then(deferred.resolve, function (err) {
        deferred.reject(`Page does not contain title "${title}"!`);
      });
  } else {
    deferred.resolve();
  }
  return deferred.promise;
};

const goto = function (page, callback) {
  setCurrentPage(page);
  browser.get(navigation.getPage(page)).then(function () {;
    browser.waitForAngular();
    return pageTitle(page).then(function () {
      callback();
    }, function (err) {
      throw new Error(err);
    });
  });
};

const redirect = function (page_name, callback) {
  setCurrentPage(page_name);
  const current_url = getPageURL();
  pageTitle(page_name).then(function () {
    waitFor(() => {
      return browser.getCurrentUrl().should.eventually.contain(current_url);
    }).should.notify(callback);
  }, function (err) {
    throw new Error(err);
  });
};

const setCurrentPage = function (page) {
  current_page = page;
};

const pageFor = function (page) {
  return require(ROOT_PATH + '/e2e/features/definitions/pages/' + page + '.json');
};

const getPage = function () {
  return current_page;
};

const getPageURL = function (page_name = current_page) {
  const json_file_name = page_name.replace(/ /g, "_");
  console.log(json_file_name );
  return pageFor("pages")[json_file_name];
};

module.exports.pageFor = pageFor;
module.exports.setPage = setCurrentPage;
module.exports.getPage = getPage;
module.exports.getPageURL = getPageURL;
module.exports.goto = goto;
module.exports.redirect = redirect;
