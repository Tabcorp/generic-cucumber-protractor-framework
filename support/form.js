var general = require('general')

var form = {
    getSelect: function (current_element, value) {
        return general.getElement(current_element).all(by.cssContainingText('option', value));
    }
}

module.exports = form;
