'use strict';

var STRING = require("./string.js"),
    DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        style: getCurrentStyle
    };

function addClass(dom) {
    var className = dom.className;
    
    dom.className = STRING.addWord(className,
                                    Array.prototype.slice.call(arguments, 1));
    
    return EXPORTS.chain;
}

function removeClass(dom) {
    var className = dom.className;
    
    dom.className = STRING.removeWord(className,
                                    Array.prototype.slice.call(arguments, 1));
    
    return EXPORTS.chain;
}


function getCurrentStyle(element) {
    var doc = element.ownerDocument,
        win = doc.defaultView || doc.parentWindow,
        dimensionRe = DIMENSION_RE,
        args = arguments,
        c = -1,
        l = args.length,
        camel = STRING.camelize,
        pixelSize = getPixelSize,
        isW3c = true;
    var style, property, access, values, value, fontSize;
    
    if ('getComputedStyle' in win) {
        style = win.getComputedStyle(element);
    }
    else if ('currentStyle' in element) {
        style = element.currentStyle;
        isW3c = false;
    }
    else {
        throw new Error("Unable to retrieve style of [element].");
    }
    
    values = {};
    fontSize = false;
    
    for (; l--;) {
        property = args[++c];
        if (property && typeof property === 'string') {
            access = camel(property);
            if (!isW3c) {
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
            }
            else {
                value = style[access];
            }
            values[property] = value;
        }
    }
    
    style = null;
    doc = null;
    win = null;
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