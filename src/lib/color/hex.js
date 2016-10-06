'use strict';

var RGBA = require("./rgba.js");

function toHex(integer) {
    var hex = integer.toString(16);
    return hex.length < 1 ? '0' + hex : hex;
}

module.exports = {
    itemize: RGBA.itemize,
    toInteger: RGBA.toInteger,
    toArray: RGBA.toArray,
    toString: function (integer) {
        var size = 0xff,
            convert = toHex,
            values = [
                convert(integer & size),
                convert((integer >> 8) & size),
                convert((integer >> 16) & size)];
        return '#' + values.join('');
    }
};
