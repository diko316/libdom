'use strict';

var FORMAT = require("./format.js"),
    PIGMENT_SIZE = 0xff;

function toArray(integer) {
    var size = PIGMENT_SIZE;
    
    return [integer & size,
            (integer >> 8) & size,
            (integer >> 16) & size,
            (integer >> 24) & size];
}

function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        min = 0,
        max = index > 2 ? 100 : PIGMENT_SIZE;
    
    value = F.format(value, format);

    return M.max(min, M.min(max, value));

}


function toInteger(r, g, b, a) {
    var size = PIGMENT_SIZE;
    
    return ((a & size) << 24) |
            ((b & size) << 16) |
            ((g & size) << 8) |
            (r & size);
}

function toString(integer) {
    var values = toArray(integer),
        alpha = (values[3] / 100);
    values[3] = parseFloat(alpha.toFixed(2));
    return 'rgba(' + values.join(',') + ')';
}

module.exports = {
    itemize: itemize,
    toArray: toArray,
    toInteger: toInteger,
    toString: toString
};
