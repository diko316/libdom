'use strict';

import {
            itemize,
            toArray,
            toInteger
        } from "./hsla.js";

export
    function toString(integer) {
        var values = toArray(integer).slice(0, 3);
        values[1] += '%';
        values[2] += '%';
        return 'hsl(' + values.join(',') + ')';
    }

export {
        itemize,
        toArray,
        toInteger
    };

