'use strict';

var FORMAT = require("./format.js");

module.exports = {
    storage: [
        0x17F,    // hue
        0x7F,    // saturation
        0x7F,    // lightness
        0x7F,    // alpha
        0x7F     // type
    ],
    itemize: function (value, index, format) {
        var F = FORMAT,
            M = Math,
            parse = parseFloat,
            min = 0,
            max = index < 1 ?
                    360 :
                    index > 2 ?
                        1 : 100;
        
        switch (format) {
        case F.HEX:
            value = (parseInt(value, 16) / 255) * max;
            break;
        case F.NUMBER:
            value = parse(value);
            break;
        case F.PERCENT:
            value = (parse(value) / 100) * max;
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    }
};
