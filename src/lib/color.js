'use strict';

var OBJECT = require("./object.js"),
    FORMAT = require("./color/format.js"),
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    TO_RGBA = {
        rgb: require("./color/rgb.js"),
        rgba: require("./color/rgba.js"),
        hsl: require("./color/hsl.js"),
        hsla: require("./color/hsla.js"),
        hex: require("./color/hex.js"),
    },
    EXPORTS = {
        parse: parseColorString,
        parseType: parseType,
        stringify: toColorString
    };

function parseType(str) {
    var items = parseColorStringType(str);
    return items ? items[0] : null;
}


function parseColorStringType(str) {
    var O = OBJECT,
        re = COLOR_RE,
        list = TO_RGBA;
    var type, m, items, isHex, item;
    
    if (O.string(str) && re.test(str)) {
        m = str.match(re);
        type = m[1];
        
        if (!O.contains(list, type)) {
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
    return null;
}

function parseColorString(str) {
    var F = FORMAT,
        formatPercent = F.PERCENT,
        formatNumber = F.NUMBER,
        formatHex = F.HEX,
        numberRe = NUMBER_RE,
        parsed = parseColorStringType(str);
        
    var c, l, item, items, itemizer, processor, type, isHex, toProcess;
        
    if (parsed) {
        type = parsed[0];
        processor = TO_RGBA[type];
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


function toColorString(colorValue, type) {
    var list = TO_RGBA,
        O = OBJECT;
    
    if (arguments.length < 2) {
        type = 'hex';
    }
    
    if (!O.contains(list, type) || !O.number(colorValue)) {
        return null;
    }
    
    return list[type].toString(colorValue);
}


module.exports = EXPORTS;