'use strict';


var RGBA = require("./rgba.js"),
    OBJECT = require("../object.js"),
    CONSTANTS = require("./constants.js"),
    EXPORTS = module.exports = OBJECT.assign({}, RGBA);

function toString(integer) {
    return 'rgb(' + RGBA.toArray(integer).slice(0, 3).join(',') + ')';
}

function toInteger(r, g, b) {
    return RGBA.toInteger(r, g, b, CONSTANTS.PERCENT);
}

EXPORTS.toString = toString;
EXPORTS.toInteger = toInteger;
