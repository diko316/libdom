'use strict';

var DETECTED = require("./browser.js"),
    DOCUMENT = global.document,
    ROOT = DOCUMENT.documentElement,
    ieVersion = DETECTED.ieVersion;

module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ieVersion === 0 || ieVersion > 8
};

DOCUMENT = ROOT = null;