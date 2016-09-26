'use strict';

var browser = require("./detect/browser.js"),
    EXPORTS = false;
    
if (browser) {
    EXPORTS = {
        browser: browser,
        event: require("./detect/event.js")
    };
}

module.exports = EXPORTS;