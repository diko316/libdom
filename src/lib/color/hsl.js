'use strict';


var HSLA = require("./hsla.js"),
    CORE = require("libcore"),
    EXPORTS = module.exports = CORE.assign({}, HSLA);

function toString(integer) {
    var values = HSLA.toArray(integer).slice(0, 3);
    values[1] += '%';
    values[2] += '%';
    return 'hsl(' + values.join(',') + ')';
}

EXPORTS.toString = toString;
