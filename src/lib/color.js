'use strict';

var OBJECT = require("./object.js"),
    STRING = require("./string.js"),
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
        parse: itemizeString,
        stringify: toColorString
    };

function itemizeString(str) {
    var re = COLOR_RE,
        F = FORMAT,
        numberRe = NUMBER_RE;
    var m, c, l, item, items, get2, returnItems,
        itemizer, processor, type;
        
    if (OBJECT.string(str) && re.test(str)) {
        
        m = str.match(re);
        type = m[1];
        
        switch (type) {
        // hsla
        case 'hsla':
        /* falls through */
        case 'hsl':
            break;
        
        // rgba
        case 'rgba':
        /* falls through */
        case 'rgb':
            
        // hex
        case '#':
        /* falls through */
        default:
            type = 'rgba';
        }
        
        processor = TO_RGBA[type];
        itemizer = processor.itemize;
        
        // process items
        c = -1;
        items = m[3];
        if (items) {
            returnItems = items = items.split(',');
            for (l = items.length; l--;) {
                item = items[++c];
                if (!numberRe.test(item)) {
                    return 0;
                }
                items[c] = itemizer(item,
                                    c,
                                    item.charAt(item.length -1) === '%' ?
                                        F.PERCENT : F.NUMBER);
                
            }
        }
        else {
            l = 3;
            get2 = l === 6;
            returnItems = [];
            items = m[2];
            for (l = items.length; l--;) {
                ++c;
                item = items.charAt(c);
                item = get2 ?
                        items.substring(c * 2, c * 2 + 1) :
                        item + item;
                
                returnItems[c] = itemizer(item,
                                        c,
                                        F.HEX);
            }
            // add alpha
            returnItems[++c] = 1;
        }
        
        // add type
        return processor.toInteger.apply(processor, returnItems);
    }
    return 0;
}


function toColorString(colorValue, type) {
    var list = TO_RGBA,
        O = OBJECT;
    
    if (arguments.length < 2) {
        type = 'hex';
    }
    
    if (!O.contains(list, type)) {
        throw new Error(STRING[1142]);
    }
    
    if (!O.number(colorValue)) {
        throw new Error(STRING[1143]);
    }
    
    return list[type].toString(colorValue);
}


module.exports = EXPORTS;