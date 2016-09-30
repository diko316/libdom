'use strict';

var DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    CSS = require("./css.js"),
    ERROR_INVALID_ELEMENT = "Invalid DOM [element] parameter.",
    DEFAULTVIEW = null,
    ELEMENT_VIEW = 1,
    PAGE_VIEW = 2,
    USE_ZOOM_FACTOR = false,
    IE_PAGE_STAT_ACCESS = 'documentElement',
    boundingRect = false,
    getPageScroll = null,
    getOffset = null,
    getSize = null,
    getBox = null,
    getScreenSize = null,
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
    
    // setter
    if (arguments.length > 1) {
        return box(element, x, y);
    }
    
    // getter
    switch (isViewable(element)) {
    case PAGE_VIEW:
        return pageBox(element).slice(0, 2);
    case ELEMENT_VIEW:
        return getOffset(element);
    }
    //console.log(element);
    throw new Error(ERROR_INVALID_ELEMENT);
    
}

function size(element, width, height) {
    
    // setter
    if (arguments.length > 1) {
        return box(element, null, null, width, height);
    }
    
    // getter
    return isViewable(element) === PAGE_VIEW ?
                pageBox(element).slice(2, 4) : getSize(element);
}

function box(element, x, y, width, height) {
    var is = isFinite,
        M = Math,
        css = CSS,
        toFloat = parseFloat,
        PADDING_TOP = 'paddingTop',
        PADDING_LEFT = 'paddingLeft',
        NUMBER = 'number',
        setter = arguments.length > 1,
        viewmode = isViewable(element);
        
    var hasLeft, hasTop, hasWidth, hasHeight, parent,
        hasPosition, hasSize,
        diff, diff1, diff2, style, style1, style2, styleAttribute;
    
    // try page box
    if (!setter && viewmode === PAGE_VIEW) {
        return pageBox(element);
    }
    
    
    if (viewmode !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    
    // setter
    if (setter) {
        
        if (x instanceof Array) {
            height = 3 in x ? x[3] : null;
            width = 2 in x ? x[2] : null;
            y = 1 in y ? x[1] : null;
            x = x[0];
        }
        
        style = css.style(element,
                        'position',
                        PADDING_TOP,
                        PADDING_LEFT,
                        'marginLeft',
                        'marginTop',
                        'paddingRight',
                        'paddingBottom');
        
        hasLeft = hasTop = hasWidth = hasHeight = hasPosition = hasSize = false;
        switch (style.position) {
        case 'relative':
        case 'absolute':
        case 'fixed':
            if (typeof x === NUMBER && is(x)) {
                hasLeft = hasPosition = true;
            }
            if (typeof y === NUMBER && is(y)) {
                hasTop = hasPosition = true;
            }
        }
        
        if (typeof width === NUMBER && is(width)) {
            hasWidth = hasSize = true;
        }
        
        if (typeof height === NUMBER && is(height)) {
            hasHeight = hasSize = true;
        }
        
        if (hasPosition || hasSize) {
            
            styleAttribute = element.style;
            
            if (hasPosition) {
                diff = getOffset(element);
                diff1 = diff2 = 0;
                // this will fail in IE 8
                if (hasLeft) {
                    diff1 = hasLeft ? x - diff[0] : 0;
                    style1 = element.offsetLeft +
                            (toFloat(style.marginLeft) || 0);
                    styleAttribute.left = (style1 + diff1) + 'px';
                    
                }
                
                if (hasTop) {
                    diff2 = hasTop ? x - diff[1] : 0;
                    style2 = element.offsetTop +
                            (toFloat(style.marginTop) || 0);
                    styleAttribute.top = (style2 + diff2) + 'px';
                }
            }
            
            // size
            if (hasSize) {
                
                if (hasWidth) {
                    diff = width - element.offsetWidth;
                    style1 = element.clientWidth -
                                (toFloat(style.paddingLeft) || 0) -
                                (toFloat(style.paddingRight) || 0);
                                
                    styleAttribute.width = M.max(style1 + diff, 0) + 'px';
                }
                
                if (hasHeight) {
                    diff = height - element.offsetHeight;
                    style1 = element.clientHeight -
                                (toFloat(style.paddingTop) || 0) -
                                (toFloat(style.paddingBottom) || 0);
                                
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
    var current, window;
    
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
        window = DOM.is(dom) ?
                        dom[DEFAULTVIEW] : dom;
        current = getPageScroll(window);
        
        if (setter) {
            setPageScroll(window,
                            x === false ?
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

function pageBox(dom) {
    var M = Math,
        help = DOM,
        subject = dom,
        box = screen();
    
    // page size
    if (help.isView(subject)) {
        subject = subject.document;
    }
    
    if (subject.nodeType === 9) {
        subject = subject[IE_PAGE_STAT_ACCESS];
        box[2] = M.max(subject.scrollWidth, box[2]);
        box[3] = M.max(subject.scrollHeight, box[3]);
    }
    subject = null;
    
    return box;
}

/**
 * Screen offset and size
 */
function screen() {
    var window = global.window,
        box = getPageScroll(window),
        size = getScreenSize(window);
    
    box[2] = size[0];
    box[3] = size[1];
    
    return box;
    
}

function w3cScreenSize(window) {
    return [window.innerWidth, window.innerHeight];
}


function ieScreenSize(window) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        size = [subject.clientWidth * factor,
                subject.clientHeight * factor];
        
    subject = null;
    return size;
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
    var scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
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
function setPageScroll(window, x, y) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1;
    window.scrollTo(x * factor, y * factor);
}

function w3cPageScrollOffset(window) {
    var offset = [(window.pageXOffset || 0), (window.pageYOffset || 0)];
    return offset;
}

function iePageScrollOffset(window) {
    var M = Math,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        offset = [M.round(subject.scrollLeft / factor),
                    M.round(subject.scrollTop / factor)];
    
    subject = null;
    
    console.log('strict? ', DETECTED.browser.strict);
    
    return offset;
}

function getZoomFactor(window) {
    var factor = 1;
    var rect, body;
    
    if (boundingRect) {
        body = window.document.body;
        
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
    var body, viewable;
    
    if (help.is(dom)) {
        switch (dom.nodeType) {
        case 9:
        case 11:
            return PAGE_VIEW;
        }
        body = dom.ownerDocument.body;
        viewable = (dom === body || help.contains(body, dom)) && ELEMENT_VIEW;
        body = null;
        return viewable;
        
    }
    
    return help.isView(dom) ? PAGE_VIEW : false;
}

/**
 * initialize
 */
function initialize() {
    var all = DETECTED,
        info = all.dimension;
    
    if (!all.browser.strict) {
        IE_PAGE_STAT_ACCESS = 'body';
    }
        
    USE_ZOOM_FACTOR = info.zoomfactor;
    DEFAULTVIEW = all.dom.defaultView;
    
    getPageScroll = info.pagescroll ?
                        w3cPageScrollOffset :
                        iePageScrollOffset;
    
    getScreenSize = info.screensize ?
                        w3cScreenSize :
                        ieScreenSize;

    boundingRect = info.rectmethod && 'getBoundingClientRect';
    getOffset = boundingRect ? rectOffset : manualOffset;
    getSize = boundingRect ? rectSize : manualSize;
    getBox = boundingRect ? rectBox : manualBox;

}





module.exports = EXPORTS;
EXPORTS.chain = EXPORTS;


