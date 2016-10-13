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
    
    BOUNDING_RECT = 'getBoundingClientRect',
    
    DEFAULTVIEW = null,
    ELEMENT_VIEW = 1,
    PAGE_VIEW = 2,
    USE_ZOOM_FACTOR = false,
    IE_PAGE_STAT_ACCESS = 'documentElement',
    
    boundingRect = false,
    getPageScroll = null,
    getOffset = null,
    getSize = null,
    //getBox = null,
    getScreenSize = null,
    EXPORTS = {
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible,
        translate: translateBox
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
        return getOffset(element).slice(0, 2);
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
    var applyStyle, viewmode, dimension;
    
    // setter
    if (arguments.length > 1) {
        
        applyStyle = translateBox(element, x, y, null, null, width, height);
        
        if (applyStyle) {
            CSS.style(element, applyStyle);
        }
        return EXPORTS.chain;
    }
    
    // getter
    viewmode = isViewable(element);
    if (viewmode === PAGE_VIEW) {
        dimension = pageBox(element);
        x = dimension[0];
        y = dimension[1];
        width = dimension[2];
        height = dimension[3];
        dimension = screen(element);
        return [
            x,
            y,
            width - x - dimension[2],
            height - y - dimension[3],
            width,
            height];
    }
    
    if (viewmode !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    dimension = getSize(element);
    width = dimension[0];
    height = dimension[1];
    dimension = getOffset(element);
    dimension[4] = width;
    dimension[5] = height;
    
    return dimension;
}

function translateBox(element, x, y, right, bottom, width, height, target) {
    var css = CSS,
        cssValue = css.unitValue,
        parse = parseFloat,
        NUMBER = 'number',
        hasLeft = false,
        hasTop = hasLeft,
        hasRight = hasLeft,
        hasBottom = hasLeft;
        
    var hasWidth, hasHeight, diff, currentDimension;
        
    if (isViewable(element) !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    
    // resolve parameters
    if (x instanceof Array) {
        target = y;
        if (x.length > 4) {
            height = 5 in x ? x[5] : null;
            width = 4 in x ? x[4] : null;
            bottom = 3 in x ? x[3] : null;
            right = 2 in x ? x[2] : null;
        }
        else {
            height = 3 in x ? x[3] : null;
            width = 2 in x ? x[2] : null;
            bottom = null;
            right = null;
        }
        y = 1 in y ? x[1] : null;
        x = x[0];
    }
    
    if (!OBJECT.type(target, '[object Object]')) {
        target = {};
    }
    
    currentDimension = css.computedStyle(element,
                                    'position',
                                    'top',
                                    'left',
                                    'right',
                                    'bottom',
                                    'width',
                                    'height');
    
    // resolve position
    switch (currentDimension.position) {
    case 'relative':
    case 'absolute':
    case 'fixed':
        
        // create position
        x = cssValue(x);
        y = cssValue(y);
        right = cssValue(right);
        bottom = cssValue(bottom);
        
        hasLeft = x !== false;
        hasTop = y !== false;
        hasRight = !hasLeft && right !== false;
        hasBottom = !hasBottom && bottom !== false;
        
        if (hasLeft || hasTop) {
            
            diff = getOffset(element);
            
            if (hasLeft) {
                target.left = typeof x === NUMBER ? (
                                    parse(currentDimension.left || 0) +
                                    (x - diff[0])
                                ) + 'px' :
                                x;
                
            }
            else if (hasRight) {
                target.right = typeof right === NUMBER ? (
                                    parse(currentDimension.right || 0) +
                                    (right - diff[2])
                                ) + 'px' :
                                right;
            }
            
            if (hasTop) {
                target.top = typeof y === NUMBER ? (
                                    parse(currentDimension.top || 0) +
                                    (y - diff[1])
                                ) + 'px' :
                                y;
            }
            else if (hasBottom) {
                target.bottom = typeof right === NUMBER ? (
                                    parse(currentDimension.bottom || 0) +
                                    (bottom - diff[3])
                                ) + 'px' :
                                bottom;
            }
        }
        
    }
    
    
    
    // resolve size
    width = cssValue(width);
    height = cssValue(height);
    
    hasWidth = width !== false;
    hasHeight = height !== false;

    if (hasWidth) {
        target.width = typeof width === NUMBER ? (
                            parse(currentDimension.width || 0) +
                            (width - element[OFFSET_WIDTH])
                        ) + 'px' :
                        width;
    }
    
    if (hasHeight) {
        target.height = typeof height === NUMBER ? (
                            parse(currentDimension.height || 0) +
                            (height - element[OFFSET_HEIGHT])
                        ) + 'px' :
                        height;
    }

    return hasLeft || hasTop || hasWidth || hasWidth ? target : null;
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
function screen(dom) {
    var help = DOM,
        subject = dom;
    var box, size;
    if (help.is(subject, 1, 9)) {
        console.log(subject);
        subject = (subject.nodeType === 1 ?
                        subject.ownerDocument : subject)[
                            help.documentViewAccess];
    }
    if (!help.isView(subject)) {
        subject = global.window;
    }
    box = getPageScroll(subject);
    size = getScreenSize(subject);
    
    box[2] = size[0];
    box[3] = size[1];
    subject = null;
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
 * Element Size
 */
function rectSize(element, boundingRect) {
    var M = Math,
        rect = boundingRect || element[BOUNDING_RECT](),
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
    var //scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        page = screen(element),
        rect = boundingRect || element[BOUNDING_RECT](),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) :
                    1,
        scrollX = page[0],
        scrollY = page[1],
        x = rect.left * factor + scrollX,
        y = rect.top * factor + scrollY,
        
        offset = [
            x,
            y,
            rect.right * factor - page[2],
            rect.bottom * factor - page[3]];
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

        findStyles = [mleft, mtop],
        parent = element.offsetParent,
        style = css.computedStyle(element,
                        [findStyles]),
        page = screen(element),
        x = element[left],
        y = element[top];
    
    x += parseFloat(style[mleft]) || 0;
    y += parseFloat(style[mtop]) || 0;
    
    for (; parent; parent = parent.offsetParent) {
        
        if (parent.nodeType === 1) {
            
            style = css.computedStyle(parent, findStyles);
            
            x += (parent[left] || 0) +
                            (parent.clientLeft || 0) +
                            (parseFloat(style[mleft]) || 0);
                            
            y += (parent[top] || 0) +
                            (parent.clientTop || 0) +
                            (parseFloat(style[mtop]) || 0);
                            
        }
    }

    for (parent = element.parentNode; parent; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            x += parent[sleft] || 0;
            y += parent[stop] || 0;
        }
    }
    
    root = parent = null;
    return [
        x,
        y,
        x + element[OFFSET_WIDTH] - page[2],
        y + element[OFFSET_HEIGHT] - page[3]];
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
        rect = body[BOUNDING_RECT]();

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

    boundingRect = DIMENSION_INFO.rectmethod && BOUNDING_RECT;

    getOffset = boundingRect ? rectOffset : manualOffset;
                        
    getSize = boundingRect ? rectSize : manualSize;
    //getBox = boundingRect ? rectBox : manualBox;
}



module.exports = EXPORTS.chain = EXPORTS;


