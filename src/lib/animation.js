'use strict';

var STRING =  require("./string.js"),
    OBJECT = require("./object.js"),
    EASING = require("./easing.js"),
    EXPORTS = {
        interval: 10,
        each: animate
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function animate(handler, displacements, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        O = OBJECT,
        defaultInterval = EXPORTS.interval,
        interval = null,
        frame = 0;
        
    var frames;
    
    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    
    function callback() {
        var specs = displacements,
            names = specs[0],
            from = specs[1],
            to = specs[2],
            total = frames,
            current = ++frame,
            len = names.length,
            result = {},
            eased = type(current, 0, 1, total);
            
        var start;
        
        for (; len--;) {
            start = from[len];
            result[names[len]] = (to[len] - start) * eased + start;
        }
        
        handler(result, current, total);
        
        if (current === total) {
            stop();
        }
        
    }
    
    if (!(handler instanceof Function)) {
        throw new Error(string.ERROR_ANIMHNDL);
    }
    
    if (!O.type(displacements, '[object Object]')) {
        throw new Error(string.ERROR_ANIMDISPL);
    }
    
    // prepare displacements
    type = O.contains(easing, type) ? easing[type] : easing.linear;
    duration = (O.number(duration) && duration > 0 ? duration : 1) * 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    displacements = prepareDisplacements(displacements);
    interval = setInterval(callback, defaultInterval);
    
    return stop;
    
}


function prepareDisplacements(displacements) {
    var O = OBJECT,
        hasOwn = O.contains,
        string = O.string,
        number = O.number,
        parse = parseFloat,
        names = [],
        from = [],
        to = [],
        len = 0;
        
    var name, value, itemFrom, itemTo;
    
    for (name in displacements) {
        if (hasOwn(displacements, name)) {
            value = displacements[name];
            if (value instanceof Array && value.length > 1) {
                itemFrom = value[0];
                if (string(itemFrom)) {
                    itemFrom = parse(itemFrom);
                }
                if (!number(itemFrom)) {
                    continue;
                }
                
                itemTo = value[1];
                if (string(itemTo)) {
                    itemTo = parse(itemTo);
                }
                if (!number(itemTo)) {
                    continue;
                }
                names[len] = name;
                from[len] = itemFrom;
                to[len++] = itemTo;
            }
        }
    }
    return [names, from, to];
}




module.exports = EXPORTS;


