'use strict';

var DETECTED = require("./detect.js"),
    OBJECT = require("./object.js"),
    STRING = require("./string.js"),
    DOM = require("./dom.js"),
    CSS = require("./css.js"),
    
    ERROR_INVALID_ELEMENT = STRING[1101],
    ERROR_INVALID_DOM = STRING[1102],
    
    OFFSET_TOP = 'offsetTop',
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    MARGIN_TOP = 'marginTop',
    MARGIN_LEFT = 'marginLeft',
    
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    
    PADDING_TOP = 'paddingTop',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    PADDING_BOTTOM = 'paddingBottom',
    
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
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible
    };

var DIMENSION_INFO, IEVERSION;

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
    var css = CSS,
        toFloat = parseFloat,
        cssValue = css.unitValue,
        NUMBER = 'number',
        ptop = PADDING_TOP,
        pleft = PADDING_LEFT,
        pright = PADDING_RIGHT,
        pbottom = PADDING_BOTTOM,
        setter = arguments.length > 1,
        viewmode = isViewable(element);
        
    var hasLeft, hasTop, hasWidth, hasHeight, parent,
        hasPosition, hasSize,
        diff, style,
        applyStyle;
    
    // try page box
    if (!setter && viewmode === PAGE_VIEW) {
        return pageBox(element);
    }
    
    
    if (viewmode !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    
    // setter
    if (setter) {
        applyStyle = null;
        
        if (x instanceof Array) {
            height = 3 in x ? x[3] : null;
            width = 2 in x ? x[2] : null;
            y = 1 in y ? x[1] : null;
            x = x[0];
        }
        
        style = css.computedStyle(element,
                        'position',
                        MARGIN_LEFT,
                        MARGIN_TOP,
                        ptop,
                        pleft,
                        pright,
                        pbottom);
        
        hasLeft = hasTop = hasWidth = hasHeight = hasPosition = hasSize = false;
        switch (style.position) {
        case 'relative':
        case 'absolute':
        case 'fixed':
            x = cssValue(x);
            if (x !== false) {
                hasLeft = hasPosition = true;
            }
            y = cssValue(y);
            if (y !== false) {
                hasTop = hasPosition = true;
            }
        }
        width = cssValue(width);
        if (width !== false) {
            hasWidth = hasSize = true;
        }
        
        height = cssValue(height);
        if (height !== false) {
            hasHeight = hasSize = true;
        }
        
        if (hasPosition || hasSize) {
            applyStyle = {};
            
            if (hasPosition) {
                diff = getOffset(element);
                
                if (hasLeft) {
                    applyStyle.left = typeof x === NUMBER ? (
                                        element[OFFSET_LEFT] -
                                        (toFloat(style[MARGIN_LEFT]) || 0) +
                                        (x - diff[0])
                                    ) + 'px' :
                                    x;
                    
                }
                
                if (hasTop) {
                    applyStyle.top = typeof y === NUMBER ? (
                                        element[OFFSET_TOP] -
                                        (toFloat(style[MARGIN_TOP]) || 0) +
                                        (y - diff[1])
                                    ) + 'px' :
                                    y;
                }
                
            }
            
            // size
            if (hasSize) {
                
                if (hasWidth) {
                    applyStyle.width = typeof width === NUMBER ? (
                                        element.clientWidth -
                                        (toFloat(style[pleft]) || 0) -
                                        (toFloat(style[pright]) || 0) +
                                        (width - element[OFFSET_WIDTH])
                                    ) + 'px' :
                                    width;
                }
                
                if (hasHeight) {
                    applyStyle.height = typeof height === NUMBER ? (
                                        element.clientHeight -
                                        (toFloat(style[ptop]) || 0) -
                                        (toFloat(style[pleft]) || 0) +
                                        (height - element[OFFSET_HEIGHT])
                                    ) + 'px' :
                                    height;
                }
                
            }
            
            css.style(element, applyStyle);
            
        }
        
        parent = null;
        return EXPORTS.chain;
    }
    
    // getter
    return getBox(element);
}


function scroll(dom, x, y) {
    var setter = arguments.length > 1,
        isNumber = OBJECT.number,
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT;
    var current, window;
    
    // validate x and y
    if (setter) {
        if (!isNumber(x)) {
            x = false;
        }
        if (!isNumber(y)) {
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
            dom[sleft] = x === false ? dom[sleft] : x;
            dom[stop] = y === false ? dom[stop] : y;
        }
        else {
            return [dom[sleft], dom[stop]];
        }
        break;
    
    default:
        throw new Error(ERROR_INVALID_DOM);
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
 * Visibility
 */
function visible(element, visibility, displayed) {
    var style = null,
        css = CSS,
        isString = OBJECT.string,
        len = arguments.length,
        attached = isViewable(element) === ELEMENT_VIEW;
    
    // setter
    if (len > 1) {
        style = {};
        
        if (isString(visibility)) {
            style.visibility = visibility;
        }
        else if (typeof visiblity === 'boolean') {
            style.visibility = visibility ? 'visible' : 'hidden';
        }
        
        
        if (displayed === false) {
            displayed = 'none';
        }
        
        if (isString(displayed)) {
            style.display = displayed;
        }
        
        css.style(element, style);
        
        return EXPORTS.chain;
        
    }
    
    // getter
    if (attached) {
        style = CSS.computedStyle(element,
                        'display',
                        'visibility');
        return style.display !== 'none' && style.visibility !== 'hidden';
    }
    
    return false;
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
        M.max(0, element[OFFSET_WIDTH] || 0),
        M.max(0, element[OFFSET_HEIGHT] || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        rect = boundingRect || element.getBoundingClientRect(),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) :
                    1,
        offset = [rect.left * factor + scrolled[0],
                    rect.top * factor + scrolled[1]];
    rect = null;
    return offset;
}

function manualOffset(element) {
    var root = global.document[IE_PAGE_STAT_ACCESS],
        css = CSS,
        
        top = OFFSET_TOP,
        left = OFFSET_LEFT,
        mtop = MARGIN_TOP,
        mleft = MARGIN_LEFT,
        
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT,
        
        offset = [element[left], element[top]],
        findStyles = [mleft, mtop],
        parent = element.offsetParent,
        style = css.computedStyle(element, findStyles);
    
    offset[0] += parseFloat(style[mleft]) || 0;
    offset[1] += parseFloat(style[mtop]) || 0;
    
    for (; parent; parent = parent.offsetParent) {
        
        if (parent.nodeType === 1) {
            
            style = css.computedStyle(parent, findStyles);
            
            offset[0] += (parent[left] || 0) +
                            (parent.clientLeft || 0) +
                            (parseFloat(style[mleft]) || 0);
                            
            offset[1] += (parent[top] || 0) +
                            (parent.clientTop || 0) +
                            (parseFloat(style[mtop]) || 0);
                            
        }
    }

    for (parent = element.parentNode; parent; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            offset[0] += parent[sleft] || 0;
            offset[1] += parent[stop] || 0;
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
        offset = [M.round(subject[SCROLL_LEFT] / factor),
                    M.round(subject[SCROLL_TOP] / factor)];
    
    subject = null;
    
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
                    (rect.right - rect.left / body[OFFSET_WIDTH]) * 100) / 100;
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
DIMENSION_INFO = DETECTED && DETECTED.dimension;
if (DIMENSION_INFO) {
    
    // strict mode
    if (!DETECTED.browser.strict) {
        IE_PAGE_STAT_ACCESS = 'body';
    }
    
    USE_ZOOM_FACTOR = DIMENSION_INFO.zoomfactor;
    DEFAULTVIEW = DETECTED.dom.defaultView;
    IEVERSION = DETECTED.browser.ieVersion;
    
    getPageScroll = DIMENSION_INFO.pagescroll ?
                        w3cPageScrollOffset :
                        iePageScrollOffset;
    
    getScreenSize = DIMENSION_INFO.screensize ?
                        w3cScreenSize :
                        ieScreenSize;

    boundingRect = DIMENSION_INFO.rectmethod && 'getBoundingClientRect';
    getOffset = boundingRect && (!IEVERSION || IEVERSION > 8) ?
                        rectOffset : manualOffset;
                        
    getSize = boundingRect ? rectSize : manualSize;
    getBox = boundingRect ? rectBox : manualBox;
}



module.exports = EXPORTS.chain = EXPORTS;


