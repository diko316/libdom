'use strict';

var currentPackage = require("../package.json"),
    detect = require("./lib/detect.js"),
    event = require("./lib/event.js"),
    EXPORTS = module.exports = {
            version: currentPackage.version,
            browser: detect.browser.browser,
            info: detect,
            on: event.on,
            un: event.un,
            purge: event.purge
        };


event.chain = EXPORTS;