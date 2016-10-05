'use strict';

var FORMAT = require("./format.js");


module.exports = {
    itemize: function (value, index, format) {
        var F = FORMAT,
            M = Math,
            parse = parseFloat,
            alpha = index > 2,
            min = 0,
            max = alpha ? 100 : 255;
            
        switch (format) {
        case F.HEX:
            value = parseInt(value, 16);
            break;
        
        case F.NUMBER:
            value = parse(value);
            if (alpha) {
                value *= 100;
            }
            break;
        
        case F.PERCENT:
            value = parse(value);
            break;
        }
        
        return M.max(min, M.min(max, M.round(value) || 0));
    },
    
    toInteger: function (r, g, b, a) {
        return (a << 24) | (b << 16) | (g << 8) | r;
    }
};
