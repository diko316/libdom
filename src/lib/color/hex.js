'use strict';

var RGBA = require("./rgba.js"),
    CORE = require("libcore"),
    EXPORTS = module.exports = CORE.assign({}, RGBA);

function toHex(integer) {
    return (integer < 16 ? '0' : '') + integer.toString(16);
}

function toString(integer) {
    var convert = toHex,
        values = RGBA.toArray(integer).slice(0, 3);
    
    values[0] = convert(values[0]);
    values[1] = convert(values[1]);
    values[2] = convert(values[2]);
    
    return '#' + values.join('');
}


EXPORTS.toString = toString;
