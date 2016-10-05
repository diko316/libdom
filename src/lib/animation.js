'use strict';

var EASING = require("./easing.js"),
    EXPORTS = {
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */


function toNumber(number) {
    switch (typeof number) {
    case 'string':
        number = parseFloat(number);
    /* falls through */
    case 'number':
        if (isFinite(number)) {
            return number;
        }
    }
    return false;
}

function createTransitionInterval(delta, duration) {
    var M = Math;
    
    // no displacement, no animation
    delta = toNumber(delta);
    if (delta === false || delta === 0) {
        return false;
    }
    
    delta = M.abs(delta);
    
    duration = toNumber(duration);
    
    // resolve duration by delta
    if (duration === false || duration < 1) {
        duration = 1;
    }
    
    return duration / delta;
}






module.exports = EXPORTS;


