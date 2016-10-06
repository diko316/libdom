'use strict';

var FORMAT = require("./format.js"),
    PIGMENT_SIZE = 0xff;

function toArray(integer) {
    var size = PIGMENT_SIZE;
    return [
        integer & size,
        (integer >> 8) & size,
        (integer >> 16) & size,
        (integer >> 24) & size];
}

function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        parse = parseFloat,
        alpha = index > 2,
        min = 0,
        max = alpha ? 100 : PIGMENT_SIZE;
        
    switch (format) {
    case F.HEX:
        value = parseInt(value, 16);
        break;
    
    case F.NUMBER:
        value = parse(value);
        if (alpha) {
            value *= 100;
        }
        break;
    
    case F.PERCENT:
        value = parse(value);
        break;
    }
    
    return M.max(min, M.min(max, M.round(value) || 0));
}


function toInteger(r, g, b, a) {
    var size = PIGMENT_SIZE;
    return ((a & size) << 24) |
            ((b & size) << 16) |
            ((g & size) << 8) |
            (r & size);
}

function toString(integer) {
    var values = toArray(integer);
    values[3] = (values[3] / 100).toFixed(2);
    return 'rgba(' + values.join(',') + ')';
}

module.exports = {
    itemize: itemize,
    toArray: toArray,
    toInteger: toInteger,
    toString: toString
};
