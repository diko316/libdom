'use strict';

var OBJECT = require("./object.js"),
    STRING = require("./string.js"),
    DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    CSS_MEASUREMENT_RE =
        /^([0-9]+(\.[0-9]+)?)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    
    SET_STYLE = styleManipulationNotSupported,
    GET_STYLE = styleManipulationNotSupported,
    REMOVE_STYLE = styleManipulationNotSupported,
    
    ERROR_INVALID_DOM = STRING.ERROR_ELEMENT,
    
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: applyStyle,
        unitValue: getCSSUnitValue
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

function computedStyleNotSupported() {
    throw new Error(STRING.ERROR_NS_COMPSTYLE);
}

function w3cGetCurrentStyle(element) {
    var camel = STRING.stylize,
        isString = OBJECT.string;
    var style, list, c, l, name, values;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = global.getComputedStyle(element);
    
    values = {};
    list = SLICE.call(arguments, 1);
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            values[name] = style[camel(name)];
        }
    }
    
    style = null;
    
    return values;
}

function ieGetCurrentStyle(element) {
    var dimensionRe = DIMENSION_RE,
        isString = OBJECT.string,
        camel = STRING.stylize,
        pixelSize = getPixelSize;
        
    var style, list, c, l, name, value, access, fontSize, values;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = element.currentStyle;
    fontSize = false;
    values = {};
    list = SLICE.call(arguments, 1);
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            
            if (dimensionRe.test(access) && style[access] !== 'auto') {
                if (fontSize === false) {
                    fontSize = pixelSize(element, style, 'fontSize', null);
                }
                value = pixelSize(element, style, access, fontSize) + 'px';
            }
            else if (access === 'float') {
                value = style.styleFloat;
            }
            else {
                value = style[access];
            }
            
            values[name] = value;
        }
    }
    
    style = value = null;
    return values;
}

function getPixelSize(element, style, property, fontSize) {
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
                            getPixelSize(parent,
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
                                        element.clientWidth :
                                        element.clientHeight);

    default: return size;
    }
}

function applyStyle(element, style, value) {
    var O = OBJECT,
        isString = O.string,
        isNumber = O.number,
        camelize = STRING.stylize,
        parse = parseCSSText,
        len = arguments.length;
    var hasOwn, name, type, elementStyle, set, remove;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    // setter
    if (len > 1) {
        
        set = SET_STYLE;
        
        if (isString(style)) {
            if (len > 2) {
                set(element, style, value);
            }
            else {
                style = parse(style);
            }
        }
        
        if (!O.type(style, '[object Object]')) {
            throw new Error(STRING.ERROR_RULE);
        }
        
        
        
        remove = REMOVE_STYLE;
        hasOwn = O.contains;
        elementStyle = element.style;
        
        for (name in style) {
            if (hasOwn(style, name)) {
                value = style[name];
                type = typeof value;
                // remove
                if (value === null || type === 'undefined')  {
                    remove(elementStyle, camelize(name), value);
                }
                else if (isString(value) || isNumber(value)) {
                    
                    set(elementStyle, camelize(name), value);
                }
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
    
    switch (typeof value) {
    case 'number':
        if (is(value)) {
            return value;
        }
        break;
    case 'string':
        if (value === 'auto' ||
            value === 'inherit' ||
            CSS_MEASUREMENT_RE.test(value)) {
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
    throw new Error(STRING.ERROR_NS_ATTRSTYLE);
}


/**
 * Style manipulation
 */

function w3cSetStyleValue(style, name, value) {
    style.setProperty(name,
                        value,
                        style.getPropertyPriority(name) || '');
}

function w3cGetStyleValue(style, name) {
    return style.getPropertyValue(name);
}

function w3cRemoveStyleValue(style, name) {
    style.removeProperty(name);
}

function ieSetStyleValue(style, name, value) {
    style.setAttribute(name, value);
}
function ieGetStyleValue(style, name) {
    return style.getAttribute(name);
}

function ieRemoveStyleValue(style, name) {
    style.removeAttribute(name);
}

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
        REMOVE_STYLE = ieRemoveStyleValue;
    }
    else if (CSS_INFO.setproperty) {
        SET_STYLE = w3cSetStyleValue;
        GET_STYLE = w3cGetStyleValue;
        REMOVE_STYLE = w3cRemoveStyleValue;
    }
    
        
}


module.exports = EXPORTS.chain = EXPORTS;