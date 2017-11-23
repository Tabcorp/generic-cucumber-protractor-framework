module.exports = function () {

    this.Then(/^I accept( dismiss)? the alert dialog/, function (negate, next) {
        if (negate) {
            browser.switchTo().alert().dismiss();
            next();
        } else {
            browser.switchTo().alert().accept();
            next();
        }
    });
}
