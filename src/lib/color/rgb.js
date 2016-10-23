'use strict';


var RGBA = require("./rgba.js"),
    CORE = require("libcore"),
    EXPORTS = module.exports = CORE.assign({}, RGBA);

function toString(integer) {
    return 'rgb(' + RGBA.toArray(integer).slice(0, 3).join(',') + ')';
}

function toInteger(r, g, b) {
    return RGBA.toInteger(r, g, b, 100);
}

EXPORTS.toString = toString;
EXPORTS.toInteger = toInteger;
