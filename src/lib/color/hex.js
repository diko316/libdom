'use strict';

import {
            itemize,
            toArray,
            toInteger
        } from "./rgba.js";

export
    function toHex(integer) {
        var M = Math;
        integer = M.max(0, M.min(integer, 255));
        return (integer < 16 ? '0' : '') + integer.toString(16);
    }

export
    function toString(integer) {
        var convert = toHex,
            values = toArray(integer).slice(0, 3);
        
        values[0] = convert(values[0]);
        values[1] = convert(values[1]);
        values[2] = convert(values[2]);
        
        return '#' + values.join('');
    }


export {
            itemize,
            toArray,
            toInteger
    };
