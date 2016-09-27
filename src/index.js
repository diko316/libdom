'use strict';

var currentPackage = require("../package.json"),
    stopper = require("./lib/stopper.js"),
    detect = require("./lib/detect.js"),
    event = require("./lib/event.js"),
    EXPORTS = {
            version: currentPackage.version,
            info: detect,
            on: event.on,
            un: event.un,
            purge: event.purge,
            dispatch: event.fire
        };
var event;

if (detect) {
    event.chain = EXPORTS;
    event.initialize();
}
else {
    stopper.overrideMethods(EXPORTS);
}

module.exports = EXPORTS;