'use strict';

import format from "./format.js";

import { number } from "libcore";

var BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    HUE = 360,
    PERCENT = 100;

export
    function itemize(value, index, colorFormat) {
        var F = format,
            M = Math,
            percent = PERCENT,
            min = 0,
            max = index < 1 ?
                    HUE : percent;
        
        switch (colorFormat) {
        case F.HEX:
            value = (parseInt(value, 16) / BYTE) * max;
            break;
        
        case F.NUMBER:
            value = (1 * value) || 0;
            if (index > 2) {
                value *= percent;
            }
            break;
        
        case F.PERCENT:
            value = (1 * value.substring(0, value.length - 1)) || 0;
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    }

export
    function toInteger(h, s, l, a) {
        var psize = BYTE_PERCENT;
        
        if (!number(a)) {
            a = PERCENT;
        }
        
        return ((a & psize) << 23) |
                ((l & psize) << 16) |
                ((s & psize) << 9) |
                (h & BYTE_HUE);
    }

export
    function toArray(integer) {
        var psize = BYTE_PERCENT;
        return [
            integer & BYTE_HUE,
            (integer >> 9) & psize,
            (integer >> 16) & psize,
            (integer >> 23) & psize];
    }

export
    function toString(integer) {
        var values = toArray(integer);
        values[1] += '%';
        values[2] += '%';
        values[3] = (values[3] / PERCENT);
        return 'hsla(' + values.join(',') + ')';
    }


