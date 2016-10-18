'use strict';


var HSLA = require("./hsl.js"),
    OBJECT = require("../object.js"),
    EXPORTS = module.exports = OBJECT.assign({}, HSLA),
    toArray = EXPORTS.toArray;

function toString(integer) {
    var values = toArray(integer);
    values[1] += '%';
    values[2] += '%';
    values.splice(3, 1);
    return 'hsl(' + values.join(',') + ')';
}

EXPORTS.toString = toString;
