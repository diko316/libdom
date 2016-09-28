'use strict';

var DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    CSS = require("./css.js"),
    ERROR_INVALID_ELEMENT = "Invalid DOM [element] parameter.",
    ELEMENT_VIEW = 1,
    PAGE_VIEW = 2,
    boundingRect = false,
    getPageScroll = null,
    getOffset = null,
    getSize = null,
    getBox = null,
    setPageScroll = null,
    EXPORTS = {
        initialize: initialize,
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen
    };
    
/**
 * Accessors
 */
function offset(element, x, y) {
    
    if (isViewable(element) !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    
    // setter
    if (arguments.length > 1) {
        return box(element, x, y);
    }
    
    // getter
    return getOffset(element);
}

function size(element, width, height) {
    if (isViewable(element) !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
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
        css = CSS,
        PADDING_TOP = 'paddingTop',
        PADDING_LEFT = 'paddingLeft',
        NUMBER = 'number';
    var hasLeft, hasTop, hasWidth, hasHeight, parent,
        diff, diff1, diff2, style, style1, style2, styleAttribute;
    
    if (isViewable(element) !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
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
        if (typeof x === NUMBER && is(x)) {
            hasLeft = true;
        }
        
        if (typeof y === NUMBER && is(y)) {
            hasTop = true;
        }
        
        if (typeof width === NUMBER && is(width)) {
            hasWidth = true;
        }
        
        if (typeof height === NUMBER && is(height)) {
            hasHeight = true;
        }
        
        if (hasLeft || hasTop || hasWidth || hasHeight) {
            styleAttribute = element.style;
            style = css.style(element,
                        'position',
                        PADDING_TOP,
                        PADDING_LEFT,
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
                                            PADDING_TOP,
                                            PADDING_LEFT);
                        
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


function scroll(dom, x, y) {
    var setter = arguments.length > 1;
    var current;
    
    // validate x and y
    if (setter) {
        if (typeof x !== 'number' || !isFinite(x)) {
            x = false;
        }
        if (typeof y !== 'number' || !isFinite(y)) {
            y = false;
        }
    }
    
    switch (isViewable(dom)) {
    case PAGE_VIEW:
        current = getPageScroll();
        if (setter) {
            setPageScroll(x === false ?
                                current[0] : x,
                            y === false ?
                                current[1] : y);
        }
        else {
            return current;
        }
        break;
    
    case ELEMENT_VIEW:
        if (setter) {
            dom.scrollLeft = x === false ? dom.scrollLeft : x;
            dom.scrollTop = y === false ? dom.scrollTop : y;
        }
        else {
            return [dom.scrollLeft, dom.scrollTop];
        }
        break;
    
    default:
        throw new Error("Invalid [dom] Object parameter.");
    }
}

/**
 * Screen offset and size
 */
function screen() {
    
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
    var scrolled = getPageScroll(),
        rect = boundingRect || element.getBoundingClientRect(),
        offset = [rect.left + scrolled[0], rect.top + scrolled[1]];
    rect = null;
    return offset;
}

function manualOffset(element) {
    var root = global.document.documentElement,
        offset = [element.offsetLeft, element.offsetTop],
        parent = element.offsetParent;

    for (; parent; parent = parent.offsetParent) {
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

    root = parent = null;
    return offset;
}


/**
 * Page Scroll
 */
function w3cSetPageScroll(x, y) {
    global.scrollTo(x, y);
}

function w3cPageScrollOffset() {
    var win = global,
        doc = win.document,
        root = doc.documentElement,
        body = doc.body,
        offset = [
            (win.pageXOffset || 0) - (root.clientLeft || body.clientLeft || 0),
            (win.pageYOffset || 0) - (root.clientTop || body.clientTop || 0)];
        
    win = doc = root = body = null;
    
    return offset;
}

function ieSetPageScroll(x, y) {
    var factor = getZoomFactor();
    global.scrollTo(x * factor, y * factor);
}

function iePageScrollOffset() {
    var M = Math,
        doc = global.document,
        root = doc.documentElement,
        body = doc.body,
        factor = getZoomFactor();
    var offset;
    
    offset = [
        M.round(root.scrollLeft / factor) -
            (root.clientLeft || body.clientLeft || 0),
        M.round(root.scrollTop / factor) -
            (root.clientTop || body.clientTop || 0)];
    
    doc = root = body = null;
    
    return offset;
}

function getZoomFactor() {
    var factor = 1,
        body = global.document.body;
    var rect;
    
    if (boundingRect) {
        // rect is only in physical pixel size in IE before version 8 
        rect = body.getBoundingClientRect();

        // the zoom level is always an integer percent value
        factor = Math.round(
                    (rect.right - rect.left / body.offsetWidth) * 100) / 100;
    }
    
    body = null;
    
    return factor;
}


/**
 * checking
 */
function isViewable(dom) {
    var help = DOM;
    
    return help.isView(dom) ?
            PAGE_VIEW :
            help.is(dom) && (dom.nodeType !== 9 ||
                !help.contains(dom.ownerDocument.body, dom)) ?
                    ELEMENT_VIEW :
                    false;
}

/**
 * initialize
 */
function initialize() {
    var info = DETECTED.dimension;
    
    getPageScroll = info.pagescroll ?
                                w3cPageScrollOffset :
                                iePageScrollOffset;
                                
    setPageScroll = info.pagescroll ?
                                w3cSetPageScroll :
                                ieSetPageScroll;

    boundingRect = info.rectmethod && 'getBoundingClientRect';
    getOffset = boundingRect ? rectOffset : manualOffset;
    getSize = boundingRect ? rectSize : manualSize;
    getBox = boundingRect ? rectBox : manualBox;

}





module.exports = EXPORTS;
EXPORTS.chain = EXPORTS;


