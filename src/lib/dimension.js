'use strict';

var DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    CSS = require("./css.js"),
    boundingRect = false,
    getScrollFromChrome = null,
    getOffset = null,
    getSize = null,
    getBox = null,
    EXPORTS = {
        initialize: initialize,
        offset: offset,
        size: size,
        box: box
    };
    
/**
 * Accessors
 */
function offset(element, x, y) {
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    // setter
    if (arguments.length > 1) {
        return box(element, x, y);
    }
    
    // getter
    return getOffset(element);
}

function size(element, width, height) {
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    // setter
    if (arguments.length > 1) {
        return box(element, null, null, width, height);
    }
    
    // getter
    return getSize(element);
}

function box(element, x, y, width, height) {
    var is = isFinite,
        M = Math,
        css = CSS;
    var hasLeft, hasTop, hasWidth, hasHeight, parent,
        diff, diff1, diff2, style, style1, style2, styleAttribute;
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    // setter
    if (arguments.length > 1) {
        
        if (x instanceof Array) {
            height = 3 in x ? x[3] : null;
            width = 2 in x ? x[2] : null;
            y = 1 in y ? x[1] : null;
            x = x[0];
        }
        
        hasLeft = hasTop = hasWidth = hasHeight = false;
        if (typeof x === 'number' && is(x)) {
            hasLeft = true;
        }
        
        if (typeof y === 'number' && is(y)) {
            hasTop = true;
        }
        
        if (typeof width === 'number' && is(width)) {
            hasWidth = true;
        }
        
        if (typeof height === 'number' && is(height)) {
            hasHeight = true;
        }
        
        if (hasLeft || hasTop || hasWidth || hasHeight) {
            styleAttribute = element.style;
            style = css.style(element,
                        'position',
                        'paddingTop',
                        'paddingLeft',
                        'paddingRight',
                        'paddingBottom');
            // offset
            if (hasLeft || hasTop) {
                diff = getOffset(element);
                diff1 = diff2 = 0;
                
                if (hasLeft) {
                    diff1 = x - diff[0];
                }
                
                if (hasTop) {
                    diff2 = y - diff[1];
                }
                
                style1 = element.offsetLeft || 0;
                style2 = element.offsetTop || 0;
                
                // apply only if relative or absolute position
                switch (style.position) {
                case 'relative': // minus padding
                    parent = element.offsetParent;
                    if (parent) {
                        parent = css.style(parent,
                                            'paddingTop',
                                            'paddingLeft');
                        
                        style1 -= parseInt(parent.paddingLeft, 10) || 0;
                        style2 -= parseInt(parent.paddingTop, 10) || 0;
                    }
                    
                /* falls through */
                case 'absolute': // apply as is
                case 'fixed':
                    styleAttribute.left = style1 + diff1 + 'px';
                    styleAttribute.top = style2 + diff2 + 'px';
                    break;
                }
                
            }
            
            // size
            if (hasWidth || hasHeight) {
                
                if (hasWidth) {
                    diff = width - element.offsetWidth;
                    style1 = element.clientWidth -
                                (parseInt(style.paddingLeft, 10) || 0) -
                                (parseInt(style.paddingRight, 10) || 0);
                                
                    styleAttribute.width = M.max(style1 + diff, 0) + 'px';
                }
                
                if (hasHeight) {
                    diff = height - element.offsetHeight;
                    style1 = element.clientHeight -
                                (parseInt(style.paddingTop, 10) || 0) -
                                (parseInt(style.paddingBottom, 10) || 0);
                                
                    styleAttribute.height = M.max(style1 + diff, 0) + 'px';
                }
                
            }
            
        }
        
        parent = styleAttribute = null;
        return EXPORTS.chain;
    }
    
    // getter
    return getBox(element);
}

/**
 * Element Box
 */
function rectBox(element) {
    var rect = element.getBoundingClientRect(),
        box = rectOffset(element, rect),
        size = rectSize(element, rect);
    
    box[2] = size[0];
    box[3] = size[1];
    box[4] = rect.right;
    box[5] = rect.bottom;
    rect = null;
    return box;
}

function manualBox(element) {
    var box = manualOffset(element),
        size = manualSize(element),
        width = size[0],
        height = size[1];
        
    box[2] = width;
    box[3] = height;
    box[4] = width + box[0];
    box[5] = height + box[1];
    
    return box;
}


/**
 * Element Size
 */
function rectSize(element, boundingRect) {
    var M = Math,
        rect = boundingRect || element.getBoundingClientRect(),
        size = [
            M.max(0, rect.width || 0),
            M.max(0, rect.height || 0)];
    rect = null;
    return size;
}

function manualSize(element) {
    var M = Math;
    return [
        M.max(0, element.offsetWidth || 0),
        M.max(0, element.offsetHeight || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var scrolled = getScrollFromChrome(),
        rect = boundingRect || element.getBoundingClientRect(),
        offset = [rect.left + scrolled[0], rect.top + scrolled[1]];
    rect = null;
    return offset;
}

function manualOffset(element) {
    var root = global.document.documentElement,
        offset = [element.offsetLeft, element.offsetTop];
    var parent;

    for (parent = element.offsetParent; parent; parent = parent.offsetParent) {
        if (parent.nodeType === 1) {
            offset[0] += (parent.offsetLeft || 0) + (parent.clientLeft || 0);
            offset[1] += (parent.offsetTop || 0) + (parent.clientTop || 0);
        }
    }

    for (parent = element.parentNode; parent; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            offset[0] += parent.scrollLeft || 0;
            offset[1] += parent.scrollTop || 0;
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
            (win.pageXOffset || 0) - (root.clientLeft || body.clientLeft || 0),
            (win.pageYOffset || 0) - (root.clientTop || body.clientTop || 0)];
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
    getSize = boundingRect ? rectSize : manualSize;
    getBox = boundingRect ? rectBox : manualBox;
    
    //window.testDimension = EXPORTS;
}





module.exports = EXPORTS;
EXPORTS.chain = EXPORTS;


