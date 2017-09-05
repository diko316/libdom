'use strict';

import {
            string,
            number,
            array,
            object,
            each
        } from "libcore";

import { get as getModule } from "./chain.js";

import DETECTED from "./detect.js";

import {
            ERROR,
            stylize as stringStylize,
            addWord,
            removeWord
        } from "./string.js";

import {
            is,
            helper
        } from "./dom.js";

import { formatColor } from "./color.js";

var PADDING_BOTTOM = 'paddingBottom',
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
    
    COMPUTED_STYLE = computedStyleNotSupported,

    ERROR_INVALID_DOM = ERROR[1101],
    
    DEFAULT_COLOR_UNIT = 'hex',

    SLICE = Array.prototype.slice;

var CSS_INFO;





function applyStyle() {
    /* jshint validthis: true */
    return arguments.length > 1 ?
                // setter
                stylize.apply(this, arguments) :

                // getter
                stylify.apply(this, arguments);



}





function onStyleElement(value, name) {
    var isNumber = number(value),
        isScalar = isNumber || string(value),
        /* jshint validthis: true */
        elementStyle = this[0],
        set = SET_STYLE,
        applied = false;

    name = stringStylize(name);

    // opacity
    if (name === 'opacity') {
        if (!isScalar) {
            // remove IE style opacity
            set(elementStyle, 'filter', null);
        }
        else {
            SET_OPACITY(elementStyle, value);
            applied = true;
        }

    }
    // dimension
    else if (isNumber && DIMENSION_RE.test(name)) {
        value = '' + value + 'px';

    }
    // color
    else if (isNumber && COLOR_RE.test(name)) {
        value = formatColor(value, DEFAULT_COLOR_UNIT);
    }

    // non-scalar value is "unset"
    if (!isScalar) {
        value = null;
    }

    set(elementStyle, name, value);

    elementStyle = null;

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



function styleManipulationNotSupported() {
    throw new Error(ERROR[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(ERROR[2002]);
}

function w3cGetCurrentStyle(element, ruleNames) {
    var camel = stringStylize,
        isString = string;
    var style, c, l, name, value, values, access;

    if (!is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }

    style = global.getComputedStyle(element);

    values = {};
    if (!array(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }
    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
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

function ieGetCurrentStyle(element, ruleNames) {
    var dimensionRe = DIMENSION_RE,
        boxRe = BOX_RE,
        isString = string,
        camel = stringStylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;

    var style, c, l, name, value, access, fontSize, values, dimension;

    if (!is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }

    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};

    if (!array(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }

    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
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
                    size / 100 * (property === 'fontSize' ?
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
        ieAdjust = DETECTED.browser.ieVersion < 9,
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
    var node, nodeStyle;

    switch (style.position) {
    case 'relative':
        left -= (parse(parentStyle[pleft]) || 0);
        top -= (parse(parentStyle[ptop]) || 0);

        if (ieAdjust) {
            node = element.parentNode;

            for (; node !== parent; node = node.parentNode) {
                nodeStyle = node.currentStyle;
                if (nodeStyle.position === 'static') {
                    left -= (parse(nodeStyle.paddingLeft) || 0) +
                            (parse(nodeStyle.borderLeftWidth) || 0);
                    top -= (parse(nodeStyle.paddingTop) || 0) +
                            (parse(nodeStyle.borderTopWidth) || 0);
                }
            }

            if (parent === element.ownerDocument.body) {
                left -= parse(parentStyle.marginLeft) || 0;
                top -= parse(parentStyle.marginTop) || 0;
            }
        }

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
    throw new Error(ERROR[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;

    if (string(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);

        return M.max(1,
                    M.min(100,
                        number(m) ? m : 100)) / 100;
    }

    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math;

    if (string(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (number(opacity)) {
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

    return number(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math;

    if (string(opacity)) {
        opacity = parseFloat(opacity);
    }

    if (number(opacity)) {
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
helper('className', addClass);
helper('style', applyStyle);


CSS_INFO = DETECTED && DETECTED.css;
if (CSS_INFO) {

    COMPUTED_STYLE = CSS_INFO.w3cStyle ?
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
        DEFAULT_COLOR_UNIT = 'rgba';
    }
}

export {
            COMPUTED_STYLE as computedStyle,
            DEFAULT_COLOR_UNIT as colorUnit
        };
        
export {
        BOX_RE as boxRe,
        DIMENSION_RE as dimensionRe,
        COLOR_RE as colorRe
    };
    
export
    function addClass(element, classNames) {
        var isString = string;
    
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }
    
        if (isString(classNames)) {
            classNames = [classNames];
        }
    
        if (array(classNames)) {
            element.className = addWord(element.className || '',
                                               classNames);
        }
    
        return getModule();
    }
    
export
    function removeClass(element, classNames) {
        var isString = string;
    
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }
    
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }
    
        if (isString(classNames)) {
            classNames = [classNames];
        }
    
        if (array(classNames)) {
            element.className = removeWord(element.className,
                                                  classNames);
        }
    
        return getModule();
    }
    
    
export
    function stylize(element, rules, value) {
        var context;
    
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }
    
        if (string(rules)) {
            if (arguments.length > 2) {
                context = {};
                context[rules] = value;
                rules = context;
            }
            else {
                rules = parseCSSText(rules);
            }
        }
    
        if (!object(rules)) {
            throw new Error(ERROR[1141]);
        }
    
        context = [element.style];
    
        each(rules, onStyleElement, context, true);
    
        context = context[0] = null;
    
        return getModule();
    }
    
export
    function stylify(element) {
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }
    
        return parseCSSText(element.style.cssText);
    }
    
    
export
    function unitValue(value) {
        var isFiniteNumber = isFinite;
        var len;
    
        switch (typeof value) {
        case 'number':
            if (isFiniteNumber(value)) {
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
            if (isFiniteNumber(value)) {
                return value;
            }
        }
    
        if (value === null) {
            return value;
        }
    
        return false;
    
    }