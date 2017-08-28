'use strict';


var NUMBER = 1,
    HEX = 2,
    PERCENT = 3;

function format(value, colorFormat) {
    
    switch (colorFormat) {
    case HEX:
        return parseInt(value, 16) || 0;
    
    case NUMBER:
        return 1 * value || 0;

    case PERCENT:
        return Math.round((1 * value || 1) * 100);
    }
    return 0;
}

export default {
                NUMBER,
                HEX,
                PERCENT,
                format
            };

