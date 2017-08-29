'use strict';


var NUMBER = 1,
    HEX = 2,
    PERCENT = 3,
    HAS_UNIT_RE = /\%$/;

function format(value, colorFormat) {
    
    switch (colorFormat) {
    case HEX:
        return parseInt(value, 16) || 0;
    
    case NUMBER:
        value = 1 * value;
        return value || 0;

    case PERCENT:
        value = HAS_UNIT_RE.test(value) ?
                    1 * value.substring(0, value.length -1) :
                    1 * value;

        return Math.round((value || 1) * 100);
    }
    return 0;
}

export default {
                NUMBER,
                HEX,
                PERCENT,
                format
            };

