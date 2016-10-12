'use strict';

var STRING =  require("./string.js"),
    OBJECT = require("./object.js"),
    ARRAY = require("./array.js"),
    EASING = require("./easing.js"),
    CSS = require("./css.js"),
    SESSIONS = {},
    EXPORTS = {
        interval: 10,
        each: animate,
        has: hasAnimationType
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function animate(handler, from, to, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        O = OBJECT,
        oType = O.type,
        list = SESSIONS,
        defaultInterval = EXPORTS.interval,
        clear = clearInterval,
        set = setInterval,
        interval = null,
        frame = 0;
        
    var frames, displacements;
    
    function control() {
        if (interval) {
            clear(interval);
            delete list[interval];
            delete control.interval;
            delete control.update;
            interval = null;
        }
    }
    
    function update(updates) {
        var specs = displacements;
        
        if (interval) {
            if (!oType(updates, '[object Object]')) {
                throw new Error(string[1152]);
            }
            applyDisplacements(specs, specs[3], updates);
            // reset frame
            frame = 0;
            
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
            eased = type(current, 0, 1, total),
            last = current === total;
            
        var start;
        
        for (; len--;) {
            start = from[len];
            result[names[len]] = (to[len] - start) * eased + start;
        }
        
        specs[3] = result;
        handler(result, last);
        
        if (last) {
            control();
        }
        
    }
    
    if (!(handler instanceof Function)) {
        throw new Error(string[1151]);
    }
    
    if (!oType(from, '[object Object]') || !oType(to, '[object Object]')) {
        throw new Error(string[1152]);
    }
    
    // prepare displacements
    type = O.contains(easing, type) ? easing[type] : easing.linear;
    duration = (O.number(duration) && duration > 0 ? duration : 1) * 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    displacements = [[], [], [], from];
    interval = set(callback, defaultInterval);
    control.interval = interval;
    control.update = update;
    list[interval] = displacements;
    displacements = applyDisplacements(displacements, from, to);
    return control;
    
}

function validValue(value) {
    var O = OBJECT;
    if (O.string(value)) {
        value = parseFloat(value);
    }
    return O.number(value) && value;
}

function applyDisplacements(session, from, to) {
    var hasOwn = OBJECT.contains,
        indexOf = ARRAY.lastIndexOf,
        format = validValue,
        names = session[0],
        sourceValues = session[1],
        targetValues = session[2],
        len = names.length;
    var name, index, source, target;
    
    // valid target names from source
    for (name in to) {
        if (!hasOwn(to, name)) {
            continue;
        }
        
        target = format(to[name]);
        
        if (target === false) {
            continue;
        }
            
        index = indexOf(names, name);
        source = hasOwn(from, name) && format(from[name]);
        
        // create from source if did not exist
        if (index === -1) {
            if (source === false) {
                continue;
            }
            index = ++len;
            names[index] = name;
            
        }
        else if (source === false) {
            source = sourceValues[index];
        }
        
        // update
        sourceValues[index] = source;
        targetValues[index] = target;

    }
    return session;
}

function hasAnimationType(type) {
    return OBJECT.contains(EASING, type);
}

/**
 * CSS animation
 */
function animateStyle(element) {
    
}


module.exports = EXPORTS;


