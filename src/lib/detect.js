'use strict';

var browser = require("./detect/browser.js");

module.exports = {
    enabled: browser.browser,
    browser: browser,
    event: require("./detect/event.js")
};