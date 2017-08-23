'use strict';

var CORE = require("libcore"),
    isString = CORE.string,
    ERROR_SUBJECT = 'Invalid [subject] parameter.',
    FORMAT = require("./color/format.js"),
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    REMOVE_SPACES = /[ \r\n\t\s]+/g,
    TO_COLOR = {
        rgb: require("./color/rgb.js"),
        rgba: require("./color/rgba.js"),
        hsl: require("./color/hsl.js"),
        hsla: require("./color/hsla.js"),
        hex: require("./color/hex.js"),
    },
    EXPORTS = {
        parse: parse,
        parseType: parseType,
        stringify: stringify
    };

function parseType(subject) {
    
    if (!isString(subject, true)) {
        throw new Error(ERROR_SUBJECT);
    }
    
    subject = preParseValue(subject);
    if (subject) {
        return parseColorStringType(subject) || null;
    }
    return null;
}

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE.test(str)) {
            return str;
        }
    }
    return null;
}


function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE),
        type = m[1];
        
    var items, isHex, item;
    
    if (!CORE.contains(list, type)) {
        type = 'hex';
    }
    
    items = m[3];
    isHex = !items;
    
    // breakdown hex
    if (isHex) {
        items = m[2];
        
        // three digit
        if (items.length < 6) {
            item = items.charAt(2);
            items = ([items.charAt(0),
                        items.substring(0, 2),
                        items.charAt(1),
                        item,
                        item]).join('');
        }
    }
    else {
        items = items.split(',');
    }
    
    return [type, isHex, items];
    
}

function parse(subject) {
    var F = FORMAT,
        formatPercent = F.PERCENT,
        formatNumber = F.NUMBER,
        formatHex = F.HEX,
        numberRe = NUMBER_RE;
        
    var parsed, c, l, item, items, itemizer, processor, type, isHex, toProcess;
    
    if (!isString(subject, true)) {
        throw new Error(ERROR_SUBJECT);
    }
    
    subject = preParseValue(subject);
    parsed = subject && parseColorStringType(subject);
        
    if (parsed) {
        type = parsed[0];
        processor = TO_COLOR[type];
        itemizer = processor.itemize;
        
        toProcess = [];
        isHex = parsed[1];
        items = parsed[2];
        
        c = -1;
        if (isHex) {
            toProcess[3] = 100;
            l = 3;
        }
        else {
            l = items.length;
        }
        
        for (; l--;) {
            item = items[++c];
            if (isHex) {
                item = items.substring(c * 2, c * 2 + 2);
            }
            else if (!numberRe.test(item)) {
                return null;
            }
            
            toProcess[c] = itemizer(item,
                                    c,
                                    isHex ?
                                        formatHex :
                                        item.charAt(item.length -1) === '%' ?
                                            formatPercent :
                                            formatNumber);
        }
        
        // add type
        return processor.toInteger.apply(processor, toProcess);
    }
    return null;
}


function stringify(colorValue, type) {
    var list = TO_COLOR,
        C = CORE;
    
    if (!C.number(colorValue)) {
        throw new Error("Invalid [colorValue] parameter.");
    }
    
    if (arguments.length < 2) {
        type = 'hex';
    }
    else if (!isString(type)) {
        throw new Error("Invalid [type] parameter.");
    }
    
    if (!C.contains(list, type)) {
        return null;
    }
    
    colorValue = Math.round(colorValue);
    
    return list[type].toString(colorValue);
}


module.exports = EXPORTS;