'use strict';

var browser = require("./detect/browser.js"),
    EXPORTS = false;
    
if (browser) {
    EXPORTS = {
        browser: browser,
        event: require("./detect/event.js"),
        dom: require("./detect/dom.js"),
        dimension: require("./detect/dimension.js")
    };
}

module.exports = EXPORTS;