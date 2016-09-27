'use strict';

var DETECTED = require("./detect.js"),
    CSS = require("./css.js"),
    boundingRect = false,
    getScrollFromChrome = null,
    getOffset = null,
    EXPORTS = {
        initialize: initialize
    };

/**
 * Element Offset
 */
function rectOffset(element) {
    var rect = element.getBoundingClientRect(),
        scrolled = getScrollFromChrome();
        
    return [rect.left + scrolled[0], rect.top + scrolled[1]];
}

function manualOffset(element) {
    var offset = [0, 0],
        parent = element,
        root = global.document.documentElement;
    
    for (; parent; parent = parent.offsetParent) {
        if (parent.nodeType === 1) {
            offset[0] += parent.offsetLeft;
            offset[1] += parent.offsetTop;
        }
    }
    parent = element.parentNode;
    for (; parent; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            offset[0] += parent.scrollLeft;
            offset[1] += parent.scrollTop;
        }
    }
    
    parent = null;
    root = null;
    return offset;
}



/**
 * Page Scroll
 */
function w3cPageScrollOffset() {
    var win = global,
        doc = win.document,
        root = doc.documentElement,
        body = doc.body,
        offset = [
            win.pageXOffset - (root.clientLeft || body.clientLeft || 0),
            win.pageYOffset - (root.clientTop || body.clientTop || 0)];
    body = null;
    root = null;
    doc = null;
    win = null;
    return offset;
}

function iePageScrollOffset() {
    var M = Math,
        doc = global.document,
        root = doc.documentElement,
        body = doc.body,
        factor = 1;
    var rect, offset;
    
    if (boundingRect) {
        // rect is only in physical pixel size in IE before version 8 
        rect = body.getBoundingClientRect ();

        // the zoom level is always an integer percent value
        factor = M.round(
                    (rect.right - rect.left / body.offsetWidth) * 100) / 100;
    }
    
    offset = [
        M.round(root.scrollLeft / factor) -
            (root.clientLeft || body.clientLeft || 0),
        M.round(root.scrollTop / factor) -
            (root.clientTop || body.clientTop || 0)];
    
    body = null;
    root = null;
    doc = null;
    
    return offset;
}



function initialize() {
    var info = DETECTED.dimension;
    
    getScrollFromChrome = info.pagescroll === 'pageOffset' ?
                            w3cPageScrollOffset : iePageScrollOffset;

    boundingRect = info.rectmethod === 'getBoundingClientRect';
    getOffset = boundingRect ? rectOffset : manualOffset;
}





module.exports = EXPORTS;
EXPORTS.chain = EXPORTS;
