'use strict';

var RGBA = require("./rgba.js"),
    OBJECT = require("../object.js"),
    CONSTANTS = require("./constants.js"),
    EXPORTS = module.exports = OBJECT.assign({}, RGBA);

function toHex(integer) {
    var hex = integer.toString(16);
    return hex.length < 1 ? '0' + hex : hex;
}

function toString(integer) {
    var size = CONSTANTS.BYTE,
        convert = toHex,
        values = [
            convert(integer & size),
            convert((integer >> 8) & size),
            convert((integer >> 16) & size)];
    return '#' + values.join('');
}


EXPORTS.toString = toString;
