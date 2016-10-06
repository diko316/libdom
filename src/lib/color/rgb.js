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

EXPORTS.toString = toString;
