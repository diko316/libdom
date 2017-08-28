'use strict';

import {
            itemize,
            toArray,
            toInteger as rgbaToInteger
        } from "./rgba.js";

export
    function toString(integer) {
        return 'rgb(' + toArray(integer).slice(0, 3).join(',') + ')';
    }

export
    function toInteger(r, g, b) {
        return rgbaToInteger(r, g, b, 100);
    }

export {
            itemize,
            toArray
        };
