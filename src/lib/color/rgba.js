'use strict';

var FORMAT = require("./format.js");


module.exports = {
    storage: [
        0xFF,    // red
        0xFF,    // green
        0xFF,    // blue
        0x7F,    // alpha
        0x7F     // type
    ],
    itemize: function (value, index, format) {
        var F = FORMAT,
            M = Math,
            parse = parseFloat,
            min = 0,
            max = index > 2 ? 100 : 255;
        console.log('index: ', index);
        switch (format) {
        case F.HEX:
            value = (parseInt(value, 16) / 255) * max;
            break;
        case F.NUMBER:
            value = parse(value);
            console.log('number: ', value);
            break;
        case F.PERCENT:
            value = (parse(value) / 100) * max;
            console.log('percent: ', value);
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    }
};
