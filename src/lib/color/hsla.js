'use strict';

var OBJECT = require("../object.js"),
    FORMAT = require("./format.js"),
    
    BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    HUE = 360,
    PERCENT = 100;
    
function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        percent = PERCENT,
        parse = parseFloat,
        min = 0,
        max = index < 1 ?
                HUE : percent;
    
    switch (format) {
    case F.HEX:
        value = (parseInt(value, 16) / BYTE) * max;
        break;
    
    case F.NUMBER:
        value = parse(value);
        if (index > 2) {
            value *= percent;
        }
        break;
    
    case F.PERCENT:
        value = parse(value);
        break;
    }
    
    return M.max(min, M.min(max, value || 0));
}

function toInteger(h, s, l, a) {
    var psize = BYTE_PERCENT;
    
    if (!OBJECT.number(a)) {
        a = PERCENT;
    }
    
    return ((a & psize) << 23) |
            ((l & psize) << 16) |
            ((s & psize) << 9) |
            (h & BYTE_HUE);
}


function toArray(integer) {
    var psize = BYTE_PERCENT;
    return [
        integer & BYTE_HUE,
        (integer >> 9) & psize,
        (integer >> 16) & psize,
        (integer >> 23) & psize];
}

function toString(integer) {
    var values = toArray(integer);
    values[1] += '%';
    values[2] += '%';
    values[3] = (values[3] / PERCENT).toFixed(2);
    return 'hsla(' + values.join(',') + ')';
}

module.exports = {
    itemize: itemize,
    toInteger: toInteger,
    toArray: toArray,
    toString: toString,
};


