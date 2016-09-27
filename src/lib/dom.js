'use strict';

var DETECTED = require("./detect.js"),
    EXPORTS = {
        initialize: initialize,
        contains: notSupportedContains,
        is: isDom,
        isView: isDefaultView
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

/**
 * node contains...
 */
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

/**
 * DOM manipulaton
 * TODO:
 *  insert before
 *  insert after
 *  appendChild
 */


/**
 * DOM select
 * TODO:
 *  CSS2 select = querySelectorAll
 *  pre order traverse
 *  in order traverse
 *  post order traverse
 *  level order traverse
 */


/**
 * is node
 */
function isDom(node, nodeType) {
    var is = isFinite;
    var type;
    
    if (node && typeof node === 'object') {
        type = node.nodeType;
        if (typeof type === 'number' && is(type)) {
            if (typeof nodeType === 'number' && is(nodeType)) {
                return type === nodeType;
            }
            return true;
        }
    }
    
    return false;
}

function isDefaultView(defaultView) {
    var type = typeof defaultView;
    
    return !!defaultView &&
            (type === 'object' || type === 'function') &&
            defaultView === defaultView.window &&
            !!defaultView.document;
}



module.exports = EXPORTS;