'use strict';

var OBJECT = require("./object.js"),
    STRING = require("./string.js"),
    DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    COLOR = require("./color.js"),
    
    PADDING_BOTTOM = 'paddingBottom',
    PADDING_TOP = 'paddingTop',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_TOP = 'offsetTop',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    CLIENT_WIDTH = 'clientWidth',
    CLIENT_HEIGHT = 'clientHeight',
    
    COLOR_RE = /[Cc]olor$/,
    
    //DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    BOX_RE = /(top|bottom|left|right|width|height)$/,
    DIMENSION_RE =
        /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/,
    
    IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i,
    IE_ALPHA_OPACITY_TEMPLATE = 'alpha(opacity=$opacity)',
    IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/,
    
    GET_OPACITY = opacityNotSupported,
    SET_OPACITY = opacityNotSupported,
    
    SET_STYLE = styleManipulationNotSupported,
    GET_STYLE = styleManipulationNotSupported,
    
    ERROR_INVALID_DOM = STRING[1101],
    
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: applyStyle,
        unitValue: getCSSUnitValue,
        styleOpacity: opacityNotSupported,
        colorUnit: 'hex',
        boxRe: BOX_RE,
        dimensionRe: DIMENSION_RE,
            
        colorRe: COLOR_RE
    },
    SLICE = Array.prototype.slice;
    
var CSS_INFO;
    


function addClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.addWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function removeClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.removeWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function applyStyle(element, style, value) {
    var O = OBJECT,
        string = O.string,
        number = O.number,
        hasOwn = O.contains,
        color = COLOR,
        set = SET_STYLE,
        setOpacity = SET_OPACITY,
        colorRe = COLOR_RE,
        parse = parseCSSText,
        dimensionRe = DIMENSION_RE,
        primaryColorUnit = EXPORTS.colorUnit,
        camelize = STRING.stylize,
        len = arguments.length;
        
    var name, elementStyle, isOpacity, isNumber, isScalar;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    // setter
    if (len > 1) {
        
        if (string(style)) {
            if (len > 2) {
                elementStyle = {};
                elementStyle[style] = value;
                style = elementStyle;
            }
            else {
                style = parse(style);
            }
        }
        
        if (!O.type(style, '[object Object]')) {
            throw new Error(STRING[1141]);
        }

        elementStyle = element.style;

        main: for (name in style) {
            if (hasOwn(style, name)) {
                value = style[name];
                name = camelize(name);
                isOpacity = name === 'opacity';
                isNumber = number(value);
                isScalar = isNumber || string(value);
                
                switch (true) {

                case name === 'opacity':
                    if (!isScalar) {
                        // remove IE style opacity
                        set(elementStyle, 'filter', value = null);
                    
                    }
                    else {
                        setOpacity(elementStyle, value);
                        continue main;
                    }
                    break;
                
                case isNumber && dimensionRe.test(name):
                    value = '' + value + 'px';
                    isNumber = !(isScalar = true);
                    break;
                
                case isNumber && colorRe.test(name):
                    value = color.stringify(value, primaryColorUnit);
                    isNumber = !(isScalar = true);
                    break;
                
                default:
                    if (!isScalar) {
                        value = null;
                    }
                }
                
                set(elementStyle, name, value);

            }
        }
        elementStyle = null;
        
        return EXPORTS.chain;
    }
    
    // getter
    return parse(element.style.cssText);
    
}

function parseCSSText(str) {
    var STATE_NAME = 1,
        STATE_VALUE = 2,
        state = STATE_NAME,
        c = -1,
        l = str.length,
        il = 0,
        name = [],
        result = {};
    var chr, value;
    
    for (; l--;) {
        chr = str.charAt(++c);
        
        switch (state) {
        case STATE_NAME:
            if (chr === ':') {
                name = name.join('');
                value = [];
                il = 0;
            }
            else {
                name[il++] = chr;
            }
            break;
        
        case STATE_VALUE:
            if (chr === ';' || !l) {
                result[name] = value.join('');
                name = [];
                il = 0;
            }
            else {
                value[il++] = chr;
            }
        }
    }
    
    return result;
}

function getCSSUnitValue(value) {
    var is = isFinite;
    var len;
    
    switch (typeof value) {
    case 'number':
        if (is(value)) {
            return value;
        }
        break;
    case 'string':
        len = value.length;
        if (CSS_MEASUREMENT_RE.test(value) &&
            value.substring(len - 2, len) !== 'px') {
            return value;
        }
        else if (value === 'auto' || value === 'inherit') {
            return value;
        }
        value = parseFloat(value);
        if (is(value)) {
            return value;
        }
    }
    
    if (value === null) {
        return value;
    }
    
    return false;
    
}

function styleManipulationNotSupported() {
    throw new Error(STRING[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(STRING[2002]);
}

function w3cGetCurrentStyle(element, list) {
    var camel = STRING.stylize,
        isString = OBJECT.string;
    var style, c, l, name, value, values, access;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = global.getComputedStyle(element);
    
    values = {};
    if (!(list instanceof Array)) {
        list = SLICE.call(arguments, 1);
    }
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            switch (access) {
            case 'opacity':
                value = GET_OPACITY(style);
                break;
            default:
                value = style[access];
            }
            values[name] = value;
        }
    }
    
    style = null;
    
    return values;
}

function ieGetCurrentStyle(element, list) {
    var dimensionRe = DIMENSION_RE,
        boxRe = BOX_RE,
        isString = OBJECT.string,
        camel = STRING.stylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;
        
    var style, c, l, name, value, access, fontSize, values, dimension;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};
    
    if (!(list instanceof Array)) {
        list = SLICE.call(arguments, 1);
    }
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            
            switch (true) {
            case access === 'opacity':
                value = getOpacity(style);
                break;
            
            case boxRe.test(access):
                if (!dimension) {
                    dimension = ieGetPositionStyle(element, style);
                }
                value = dimension[access] + 'px';
                break;
            
            case dimensionRe.test(access) && style[access] !== 'auto':
                if (fontSize === false) {
                    fontSize = pixelSize(element, style, 'fontSize', null);
                }
                value = pixelSize(element, style, access, fontSize) + 'px';
                break;
            
            case access === 'float':
                value = style.styleFloat;
                break;
            
            default:
                value = style[access];
            }
            
            values[name] = value;
        }
    }
    
    style = value = null;
    return values;
}


function ieGetPixelSize(element, style, property, fontSize) {
    var sizeWithSuffix = style[property],
        size = parseFloat(sizeWithSuffix),
        suffix = sizeWithSuffix.split(NUMBER_RE)[0];
    var parent;

    switch (suffix) {
    case 'in': return size * 96;
    case 'pt': return size * 96 / 72;
    case 'em': 
    case '%':
        if (!fontSize) {
            parent = element.parentElement;
            fontSize = EM_OR_PERCENT_RE.test(suffix) && parent ?
                            ieGetPixelSize(parent,
                                        parent.currentStyle,
                                        'fontSize',
                                        null) :
                            16;
            parent = null;
        }
        return suffix === 'em' ?
                    size * fontSize :
                    size / 100 * (property == 'fontSize' ?
                                    fontSize :
                                    WIDTH_RE.test(property) ?
                                        element[CLIENT_WIDTH] :
                                        element[CLIENT_HEIGHT]);

    default: return size;
    }
}


function ieGetPositionStyle(element, style) {
    var parent = element.offsetParent,
        parentStyle = parent.currentStyle,
        parse = parseFloat,
        
        ptop = PADDING_TOP,
        pleft = PADDING_LEFT,
        pbottom = PADDING_BOTTOM,
        pright = PADDING_RIGHT,
        
        cwidth = CLIENT_WIDTH,
        cheight = CLIENT_HEIGHT,
        
        left = element[OFFSET_LEFT],
        top = element[OFFSET_TOP],
        right = parent[cwidth] - element[OFFSET_WIDTH],
        bottom = parent[cheight] - element[OFFSET_HEIGHT],
        width = element[cwidth],
        height = element[cheight];
        
    switch (style.position) {
    case 'relative':
        left -= (parse(parentStyle[pleft]) || 0);
        top -= (parse(parentStyle[ptop]) || 0);
        
    /* falls through */
    case 'absolute':
    case 'fixed':
        left -= (parse(parentStyle.borderLeftWidth) || 0);
        top -= (parse(parentStyle.borderTopWidth) || 0);
    }
    
    right -= left;
    bottom -= top;
    width -= (parse(style[pleft]) || 0) +
                (parse(style[pright]) || 0);
    height -= (parse(style[ptop]) || 0) +
                (parse(style[pbottom]) || 0);
    
    parent = parentStyle = null;
    
    return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: width,
        height: height
    };
}

/**
 * opacity
 */
function opacityNotSupported() {
    throw new Error(STRING[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        O = OBJECT,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;
    
    if (O.string(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);
        
        return M.max(1,
                    M.min(100,
                        O.number(m) ? m : 100)) / 100;
    }
    
    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math,
        O = OBJECT;
    
    if (O.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (O.number(opacity)) {
        style.filter = IE_ALPHA_OPACITY_TEMPLATE.
                                replace(IE_ALPHA_OPACITY_TEMPLATE_RE,
                                    M.min(100,
                                        M.max(0,
                                            M.round(opacity * 100)
                                        )).toString(10));
    }
}

function w3cGetOpacity(style) {
    var opacity = parseFloat(style.opacity);
    
    return OBJECT.number(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math,
        O = OBJECT;
    
    if (O.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    
    if (O.number(opacity)) {
        style.opacity = M.min(1,
                            M.max(0, opacity)).toFixed(2);
    }
}

/**
 * Style manipulation
 */
function w3cSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeProperty(name);
    }
    else {
        style[name] = value;
        //style.setProperty(name,
        //                    value,
        //                    style.getPropertyPriority(name) || '');
    }
}

function w3cGetStyleValue(style, name) {
    return style.getPropertyValue(name);
}

function ieSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeAttribute(name);
    }
    else {
        //style.setAttribute(name, value);
        style[name] = value;
    }
}
function ieGetStyleValue(style, name) {
    return style.getAttribute(name);
}



/**
 * DOM Helpers
 */


// register DOM Helpers
DOM.helper('className', addClass);
DOM.helper('style', applyStyle);


CSS_INFO = DETECTED && DETECTED.css;
if (CSS_INFO) {
    
    EXPORTS.computedStyle = CSS_INFO.w3cStyle ?
                                w3cGetCurrentStyle :
                                CSS_INFO.ieStyle ?
                                    ieGetCurrentStyle :
                                    computedStyleNotSupported;
                            
    if (CSS_INFO.setattribute) {
        SET_STYLE = ieSetStyleValue;
        GET_STYLE = ieGetStyleValue;
    }
    else if (CSS_INFO.setproperty) {
        SET_STYLE = w3cSetStyleValue;
        GET_STYLE = w3cGetStyleValue;
    }
    
    if (CSS_INFO.opacity) {
        GET_OPACITY = w3cGetOpacity;
        SET_OPACITY = w3cSetOpacity;
    }
    else if (CSS_INFO.filterOpacity) {
        GET_OPACITY = ieGetOpacity;
        SET_OPACITY = ieSetOpacity;
    }
    
    if (CSS_INFO.alphaColor) {
        EXPORTS.colorUnit = 'rgba';
    }
}


module.exports = EXPORTS.chain = EXPORTS;