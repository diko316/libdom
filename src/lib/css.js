'use strict';

var OBJECT = require("./object.js"),
    STRING = require("./string.js"),
    DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    
    PADDING_BOTTOM = 'paddingBottom',
    PADDING_TOP = 'paddingTop',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    
    MARGIN_LEFT = 'marginLeft',
    MARGIN_TOP = 'marginTop',
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_TOP = 'offsetTop',
    
    
    DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    
    SET_STYLE = styleManipulationNotSupported,
    GET_STYLE = styleManipulationNotSupported,
    REMOVE_STYLE = styleManipulationNotSupported,
    
    ERROR_INVALID_DOM = STRING[1101],
    
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: applyStyle,
        unitValue: getCSSUnitValue,
        dimension: getPixelDimensionStyle
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
        isString = O.string,
        isNumber = O.number,
        parse = parseCSSText,
        camelize = STRING.stylize,
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

/**
 * Style dimension
 */
function getPixelDimensionStyle(element, style) {
    
    var toFloat = parseFloat,
        ptop = PADDING_TOP,
        pbottom = PADDING_BOTTOM,
        pleft = PADDING_LEFT,
        pright = PADDING_RIGHT,
        
        mleft = MARGIN_LEFT,
        mtop = MARGIN_TOP,
        
        position = 'position',
        fontSize = 'fontSize';
        
    if (!style) {        
        style = EXPORTS.computedStyle(element,
                                fontSize,
                                position,
                                mleft,
                                mtop,
                                ptop,
                                pbottom,
                                pleft,
                                pright);
    }
    
    return {
        
        position: style[position],
        
        left: element[OFFSET_LEFT] - (toFloat(style[mleft]) || 0),
        
        top: element[OFFSET_TOP] - (toFloat(style[mtop]) || 0),
        
        // pixel width
        width: element.clientWidth - (toFloat(style[pleft]) || 0) -
                                (toFloat(style[pright]) || 0),
        // pixel height
        height: element.clientHeight - (toFloat(style[pleft]) || 0) -
                                (toFloat(style[pright]) || 0)
        
    };

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
    throw new Error(STRING[2001]);
}

/**
 * Style info
 */

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
                                        element.clientWidth :
                                        element.clientHeight);

    default: return size;
    }
}

function computedStyleNotSupported() {
    throw new Error(STRING[2002]);
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
        toFloat = parseFloat,
        pixelSize = ieGetPixelSize,
        
        ptop = PADDING_TOP,
        pleft = PADDING_LEFT,
        pbottom = PADDING_BOTTOM,
        pright = PADDING_RIGHT;
        
    var style, list, c, l, name, value, access, fontSize, values, dimension,
        parent, parentStyle, parentFontSize, parentWidth, parentHeight, isDimension,
        top, left, width, height, elementStyle;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};
    list = SLICE.call(arguments, 1);
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            isDimension = false;
            switch (access) {
            case 'width':
            case 'height':
            case 'top':
            case 'left':
            case 'bottom':
            case 'right':
                isDimension = true;
                
                if (fontSize === false) {
                    fontSize = pixelSize(element, style, 'fontSize', null);
                }
                    
                if (!dimension) {
                    parent = element.offsetParent;
                    parentStyle = parent.style;
                    parentFontSize = pixelSize(parent,
                                                parentStyle,
                                                'fontSize',
                                                null);
                    parentWidth = parent.clientWidth -
                                    (toFloat(
                                        pixelSize(parent,
                                                parentStyle,
                                                pleft,
                                                parentFontSize)
                                    ) || 0) -
                                    (toFloat(
                                        pixelSize(parent,
                                                parentStyle,
                                                pright,
                                                parentFontSize)
                                    ) || 0);
                    parentHeight = parent.clientHeight -
                                    (toFloat(
                                        pixelSize(parent,
                                                parentStyle,
                                                ptop,
                                                parentFontSize)
                                    ) || 0) -
                                    (toFloat(
                                        pixelSize(parent,
                                                parentStyle,
                                                pbottom,
                                                parentFontSize)
                                    ) || 0);

                    left = element[OFFSET_LEFT] -
                                (toFloat(
                                    pixelSize(element,
                                        style,
                                        MARGIN_LEFT,
                                        fontSize)
                                ) || 0);
                                
                    top = element[OFFSET_TOP] -
                            (toFloat(
                                pixelSize(element,
                                        style,
                                        MARGIN_TOP,
                                        fontSize)
                            ) || 0);
                            
                    width = element.clientWidth -
                            (toFloat(
                                pixelSize(element,
                                        style,
                                        pleft,
                                        fontSize)
                            ) || 0) -
                            (toFloat(
                                pixelSize(element,
                                        style,
                                        pright,
                                        fontSize)
                            ) || 0);
                            
                    height = element.clientHeight -
                            (toFloat(
                                pixelSize(element,
                                        style,
                                        ptop,
                                        fontSize)
                            ) || 0) -
                            (toFloat(
                                pixelSize(element,
                                        style,
                                        pbottom,
                                        fontSize)
                            ) || 0);
                    elementStyle = element.style;
                    dimension = {
                        left: left,
                        right: parentWidth - left - width,
                        top: top,
                        bottom: parentHeight - top - height,
                        width: width,
                        height: height
                    };
                }
            }
            
            if (isDimension) {
                value = dimension[access];
            }
            else if (dimensionRe.test(access) && style[access] !== 'auto') {
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