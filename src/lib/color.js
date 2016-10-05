'use strict';

var FORMAT = require("./color/format.js"),
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    TO_RGBA = {
        rgba: require("./color/rgba.js"),
        hsla: require("./color/hsla.js")
    },
    EXPORTS = {
        parse: itemizeString
    };

function itemizeString(str) {
    var re = COLOR_RE,
        F = FORMAT,
        numberRe = NUMBER_RE;
    var m, alpha, c, l, item, items, get2, returnItems,
        itemizer, processor, type;
        
    if (re.test(str)) {
        
        m = str.match(re);
        alpha = false;
        type = m[1];
        
        switch (type) {
        // hsla
        case 'hsla':
            alpha = true;
        /* falls through */
        case 'hsl':
            break;
        
        // rgba
        case 'rgba':
            alpha = true;
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



module.exports = EXPORTS;