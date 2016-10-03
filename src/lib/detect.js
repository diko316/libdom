'use strict';

var browser = require("./detect/browser.js"),
    EXPORTS = false;
    

if (browser) {
    EXPORTS = {
        browser: browser,
        event: require("./detect/event.js"),
        dom: require("./detect/dom.js"),
        css: require("./detect/css.js"),
        dimension: require("./detect/dimension.js"),
        selection: require("./detect/selection.js")
    };
}

module.exports = EXPORTS;