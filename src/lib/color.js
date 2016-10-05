'use strict';

var FORMAT = require("./color/format.js"),
    HASOWN = Object.prototype.hasOwnProperty,
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^([0-9]+(\.[0-9]+)?)(\%)?$/,
    FORMAT_INDEX = {
        1: 'rgba',
        2: 'hsla'
    },
    PROCESSOR = {
        hsla: require("./color/hsla.js"),
        rgba: require("./color/rgba.js")
    },
    EXPORTS = {
        parse: itemizeString
    };
    
var index;

for (index in FORMAT_INDEX) {
    if (HASOWN.call(FORMAT_INDEX, index)) {
        index = parseInt(index, 10);
        if (index) {
            FORMAT_INDEX[FORMAT_INDEX[index]] = index;
        }
    }
}


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
        
        console.log('match! ', m);
        
        switch (type) {
        // hsla
        case 'hsla':
            alpha = true;
        /* falls through */
        case 'hsl':
            itemizer = 'hsla';
            console.log('hasla!!!');
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
            itemizer = 'rgba';
        }
        
        processor = PROCESSOR[itemizer];
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
        returnItems[returnItems.length] = FORMAT_INDEX[type];
        
        return itemsToInteger.apply(null, returnItems);
    }
    return 0;
}



function itemsToInteger() {
    var args = arguments,
        id = args[args.length - 1],
        type = FORMAT_INDEX[id],
        processor = PROCESSOR[type],
        storage = processor.storage,
        total = storage.length,
        value = 0,
        block = 0;
        
    var size, item, l;
    
    for (l = total; l--;) {
        console.log('storage ', storage[l]);
        block += (storage[l] + 1) / 32;
    }
    
    
    console.log('total blocks: ', block);
    
    // sum up
    for (l = total; l--;) {
        size = storage[l];
        block -= (size + 1) / 32;
        item = args[l] & size;
        
        value |= block ? item << block : item;
        
        //value |= block ?
        //            item << block : item;
        
        console.log('block: ', block, ' size ', size, ' item ', item);
        
        //value += block ?
        //            item << block : item;
        //console.log('size: ', size, ' data: ', args[l], ' current: ', value, ' block: ', block);
        
    }
    
    console.log(value);
    
    return value;
    
}





module.exports = EXPORTS;