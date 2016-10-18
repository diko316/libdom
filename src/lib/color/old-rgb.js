'use strict';


var RGBA = require("./rgba.js"),
    OBJECT = require("../object.js"),
    EXPORTS = module.exports = OBJECT.assign({}, RGBA),
    toArray = EXPORTS.toArray;

function toString(integer) {
    var values = toArray(integer);
    values.splice(3, 1);
    return 'rgb(' + values.join(',') + ')';
}

function toInteger(r, g, b) {
    return RGBA.toInteger(r, g, b, 100);
}
EXPORTS.toString = toString;
EXPORTS.toInteger = toInteger;
