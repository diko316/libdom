'use strict';

var STRING = require("./string.js"),
    DETECTED = require("./detect.js"),
    DOM = require("./dom.js"),
    DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    EXPORTS = {
        initialize: initialize,
        add: addClass,
        remove: removeClass,
        style: computedStyleNotSupported
    };
    
function initialize() {
    var info = DETECTED.css,
        context = EXPORTS,
        computed = info.computedStyle;
    
    context.style = computed === 'getComputedStyle' ?
                            w3cGetCurrentStyle :
                            computed === 'currentStyle' ?
                                ieGetCurrentStyle :
                                computedStyleNotSupported;
}

function addClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    className = element.className;
    
    element.className = STRING.addWord(className,
                                    Array.prototype.slice.call(arguments, 1));
    
    return EXPORTS.chain;
}

function removeClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    className = element.className;
    
    element.className = STRING.removeWord(className,
                                    Array.prototype.slice.call(arguments, 1));
    
    return EXPORTS.chain;
}

function computedStyleNotSupported() {
    throw new Error("Computed style is not supported in this browser.");
}

function w3cGetCurrentStyle(element) {
    var camel = STRING.camelize;
    var win, style, list, c, l, name, values;
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    win = element.ownerDocument.defaultView;
    style = win.getComputedStyle(element);
    
    values = {};
    list = Array.prototype.slice.call(arguments, 1);
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (name && typeof name === 'string') {
            values[name] = style[camel(name)];
        }
    }
    
    style = null;
    win = null;
    return values;
}

function ieGetCurrentStyle(element) {
    var dimensionRe = DIMENSION_RE,
        camel = STRING.camelize,
        pixelSize = getPixelSize;
        
    var style, list, c, l, name, value, access, fontSize, values;
    
    if (!DOM.is(element, 1)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    style = element.currentStyle;
    fontSize = false;
    values = {};
    list = Array.prototype.slice.call(arguments, 1);
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (name && typeof name === 'string') {
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
        suffix = sizeWithSuffix.split(NUMBER_RE)[0],
        isEm = suffix === 'em';

    switch (suffix) {
    case 'in': return size * 96;
    case 'pt': return size * 96 / 72;
    case 'em': 
    case '%':
        fontSize = fontSize !== null ?
                fontSize :
                EM_OR_PERCENT_RE.test(suffix) && element.parentElement ?
                    getPixelSize(element.parentElement,
                        element.parentElement.currentStyle,
                        'fontSize',
                        null) :
                    16;
        if (isEm) {
            return size * fontSize;
        }
        return size / 100 * (property == 'fontSize' ?
                                    fontSize :
                                    WIDTH_RE.test(property) ?
                                        element.clientWidth :
                                        element.clientHeight);
    default: return size;
    }
}

module.exports = EXPORTS;
EXPORTS.chain = EXPORTS;