'use strict';

var DETECTED = require("./browser.js"),
    WINDOW = global.window,
    ieVersion = DETECTED.ieVersion;

module.exports = {
        screensize: typeof WINDOW.innerWidth !== 'undefined',
        pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
        rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
        zoomfactor: ieVersion > 0 && ieVersion < 8,
        ie8: ieVersion === 8
    };

WINDOW = null;

