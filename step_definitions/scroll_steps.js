const general = require('../support/general');

module.exports = function () {


    this.Then(/^I scroll down (\d+)$/, function (scroll_amount, next) {
        general.scrollDown(scroll_amount)
            .then(function () {
                next();
            });
    });

    this.Then(/^I scroll to the bottom of the page$/, function (next) {
        general.scrollToTheBottom()
            .then(function () {
                next();
            });
    });



};
