'use strict';

var DETECTED = require("./detect.js"),
    EXPORTS = {
        initialize: initialize,
        contains: notSupportedContains
    };

function initialize() {
    var info = DETECTED.dom,
        context = EXPORTS;
    
    switch (info.comparison) {
    case 'compareDocumentPosition':
        context.contains = w3cContains;
        break;
    case 'contains':
        context.contains = ieContains;
        break;
    default:
        context.contains = notSupportedContains;
    }
}


function notSupportedContains() {
    throw new Error("DOM position comparison is not supported");
}

function w3cContains(ancestor, descendant) {
    return 0 < ancestor.compareDocumentPosition(descendant) &
                ancestor.ownerDocument.DOCUMENT_POSITION_CONTAINED_BY;
}

function ieContains(ancestor, descendant) {
    return ancestor.contains(descendant);
}

module.exports = EXPORTS;