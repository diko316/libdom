'use strict';

var STRING =  require("./string.js"),
    OBJECT = require("./object.js"),
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

function animate(handler, displacements, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        O = OBJECT,
        list = SESSIONS,
        defaultInterval = EXPORTS.interval,
        interval = null,
        frame = 0;
        
    var frames;
    
    function stop() {
        if (interval) {
            clearInterval(interval);
            delete list[interval];
            delete stop.interval;
            interval = null;
        }
    }
    
    function callback() {
        var specs = displacements,
            names = specs[1],
            from = specs[2],
            to = specs[3],
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
        
        handler(result, last);
        
        if (last) {
            stop();
        }
        
    }
    
    if (!(handler instanceof Function)) {
        throw new Error(string[1151]);
    }
    
    if (!O.type(displacements, '[object Object]')) {
        throw new Error(string[1152]);
    }
    
    // prepare displacements
    type = O.contains(easing, type) ? easing[type] : easing.linear;
    duration = (O.number(duration) && duration > 0 ? duration : 1) * 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    interval = setInterval(callback, defaultInterval);
    stop.interval = interval;
    list[interval] = [{}, [], [], []];
    displacements = applyDisplacements(interval, displacements);
    
    return stop;
    
}

function applyDisplacements(sessionId, displacements) {
    var list = SESSIONS,
        O = OBJECT,
        hasOwn = O.contains,
        string = O.string,
        number = O.number,
        parse = parseFloat;
    var config, name, value, names, len, from, to, index, idx, itemFrom, itemTo;
    
    if (sessionId in list) {
        config = list[sessionId];
        //displacements = config[1];
        index = config[0];
        names = config[1];
        from = config[2];
        to = config[3];
        len = names.length - 1;
        
        for (name in displacements) {
            if (hasOwn(displacements, name)) {
                value = displacements[name];
                if (value instanceof Array && value.length > 1) {
                    idx = hasOwn(index, name) ?
                                index[name] : -1;
                    
                    // finalize value
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
                    
                    // create
                    if (idx === -1) {
                        index[name] = idx = ++len;
                        names[idx] = name;
                    }
                    
                    // update
                    from[idx] = itemFrom;
                    to[idx] = itemTo;
                }
                
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
        return config;
    }
    return void(0);
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


