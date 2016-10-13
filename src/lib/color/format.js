'use strict';

var EXPORTS = module.exports = {
        NUMBER: 1,
        HEX: 2,
        PERCENT: 3,
        format: convert2Number
    };


function convert2Number(value, format) {
    var parse = parseFloat,
        F = EXPORTS;
    console.log('format: ', format);
    switch (format) {
    case F.HEX:
        return parseInt(value, 16) || 0;
    
    case F.NUMBER:
        return parse(value) || 0;

    case F.PERCENT:
        console.log('value: ', value, ' = ', (parse(value) || 1) * 100);
        return Math.round((parse(value) || 1) * 100);
    }
    return 0;
}

