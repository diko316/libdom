'use strict';

import {
            string,
            number,
            method,
            object,
            contains,
            each as eachProperty
        } from "libcore";
        
import { ERROR } from "./string.js";

import { parseColor as colorParse } from "./color.js";

import * as EASING from "./easing.js";

import {
            boxRe,
            dimensionRe,
            colorRe,
            stylize,
            unitValue,
            computedStyle
        } from "./css.js";

import {
            box as dimensionBox,
            translate
        } from "./dimension.js";


var SESSION_ACCESS = '__animate_session',
    BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    },
    DEFAULT_EASING = 'easeOut',
    DEFAULT_DURATION = 0.5,
    DEFAULT_INTERVAL = 10,
    SESSIONS = {};


/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function empty() {
    
}


function validValue(value) {
    if (string(value)) {
        value = parseFloat(value);
    }
    return number(value) && value;
}

function applyDisplacements(session, from, to) {
    
    eachProperty(to, onApplyDisplacement, [from, session], true);
    
    return session;
}

function onApplyDisplacement(value, name, to) {
    /* jshint validthis:true */
    var context = this,
        format = validValue,
        from = context[0],
        session = context[1],
        names = session[0],
        sourceValues = session[1];
        
    var index, source, target, sourceEnded;
        
    target = format(to[name]);
    
    if (target !== false) {
        index = names.indexOf(name);
        source = contains(from, name) &&
                    format(from[name]);
                    
        sourceEnded = source === false;
        
        // create from source if did not exist
        if (index === -1) {
            if (sourceEnded) {
                return true;
            }
            index = names.length;
            names[index] = name;
            
        }
        else if (sourceEnded) {
            
            source = sourceValues[index];
        }
        
        // update
        sourceValues[index] = source;
        session[2][index] = target;
        
    }

    
    return true;
}



/**
 * CSS animation
 */


function createElementHandler(animate) {
    function onAnimate(values, current, total) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        translate(node,
                'left' in values ? values.left : false,
                'top' in values ? values.top : false,
                'right' in values ? values.right : false,
                'bottom' in values ? values.bottom : false,
                'width' in values ? values.width : false,
                'height' in values ? values.height : false,
                values);
        
        stylize(node, values);
        
        if (current === total) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var values = computedStyle(element, names),
        domBox = dimensionBox,
        c = -1,
        l = names.length,
        cssUnitValue = unitValue,
        dimensionMatch = dimensionRe,
        colorMatch = colorRe,
        parse = colorParse,
        boxPosition = BOX_POSITION,
        box = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box) {
                box = domBox(element);
            }
            value = box[boxPosition[name]];
        }
        else if (dimensionMatch.test(name)) {
            value = cssUnitValue(value);
        }
        else if (colorMatch.test(name)) {
            value = parse(value);
        }
        values[name] = parseFloat(value) || 0;
    }
    
    return values;
}


function eachElementValues(value, name) {
    /*jshint validthis:true */
    var stat = this,
        names = stat[0],
        values = stat[1],
        snames = stat[2],
        statics = stat[3],
        raw = value;
    
    // opacity
    if (name === 'opacity') {
        value = parseFloat(raw);
        
    }
    // box and dimension
    else if (boxRe.test(name) || dimensionRe.test(name)) {
        value = unitValue(raw);
        
    }
    // color
    else if (colorRe.test(name)) {
        value = colorParse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (number(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}



export {
        DEFAULT_EASING as defaultEasing,
        DEFAULT_DURATION as duration,
        DEFAULT_INTERVAL as interval,
        EASING as easing
    };
    
export
    function transition(callback, from, to, type, duration) {
        var M = Math,
            easing = EASING,
            isObject = object,
            list = SESSIONS,
            defaultInterval = DEFAULT_INTERVAL,
            clear = clearInterval,
            set = setInterval,
            interval = null,
            alen = arguments.length,
            frame = 0;
            
        var frames, displacements;
        
        function stop() {
            var fn = stop;
            
            if (interval) {
                clear(interval);
                delete list[interval];
                delete fn.session;
                delete fn.update;
                delete fn.running;
                interval = null;
            }
            fn = null;
        }
        
        function update(updates, initialValues, animationType) {
            var specs = displacements,
                typeObject = isObject;
            
            if (interval) {
                if (!typeObject(updates)) {
                    throw new Error(ERROR[1152]);
                }
                
                if (!typeObject(initialValues)) {
                    initialValues = specs[3];
                }
                applyDisplacements(specs, initialValues, updates, animationType);
                // reset frame
                frame = 0;
                
            }
        }
        
        function run() {
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
            
            // normal animation
            for (; len--;) {
                start = from[len];
                result[names[len]] = (to[len] - start) * eased + start;
            }
            
            
            specs[3] = result;
            callback(result, current, total);
            
            if (last) {
                stop();
            }
            
        }
        
        if (!method(callback)) {
            throw new Error(ERROR[1151]);
        }
        
        if (!isObject(from) || !isObject(to)) {
            throw new Error(ERROR[1152]);
        }
        
        // validate type
        if (alen < 4) {
            type = DEFAULT_EASING;
        }
        else if (!has(type)) {
            throw new Error(string[1153]);
        }
        
        // validate duration
        if (alen < 5) {
            duration = DEFAULT_DURATION;
        }
        else if (!number(duration) || duration <= 0) {
            throw new Error(ERROR[1154]);
        }
        
        // prepare displacements
        type = easing[type];
        duration *= 1000;
        frames = M.max(10, M.round(duration / defaultInterval));
        
        displacements = [[], [], [], from, stop];
        interval = set(run, defaultInterval);
        stop.session = interval;
        stop.update = update;
        stop.running = true;
        list[interval] = displacements;
        displacements = applyDisplacements(displacements, from, to);
        return stop;
        
    }

export
    function has(type) {
        return string(type) && contains(EASING, type);
    }
    
export
    function animateStyle(element, styles, type, duration) {
        var access = SESSION_ACCESS,
            defaultEasing = DEFAULT_EASING,
            defaultDuration = DEFAULT_DURATION,
            stat = [[], {}, [], {}],
            alen = arguments.length,
            session = null;
        //var values = createElementValues(styles);
        
        var sessionId, animateObject,
            names, defaults, animateValues, staticValues;
            
        if (!object(styles)) {
            throw new Error(ERROR[1152]);
        }
            
        eachProperty(styles, eachElementValues, stat);
        
        names = stat[0];
        animateValues = stat[1];
        staticValues = stat[3];
        
        
        if (alen < 4) {
            duration = defaultDuration;
            
            if (alen < 3) {
                type = defaultEasing;
            }
        }
        
        if (!string(type, true)) {
            throw new Error(string[1153]);
        }
        else if (!has(type)) {
            type = defaultEasing;
        }
        
        if (!number(duration) || duration <= 0) {
            throw new Error(ERROR[1154]);
        }
        
        // has animation
        if (names.length) {
            sessionId = element.getAttribute(access);
            defaults = createStyleDefaults(element, names);
            
            // create
            if (!sessionId) {
                animateObject = {
                    node: element
                };
                
                session = transition(createElementHandler(animateObject),
                                     defaults,
                                     animateValues,
                                     type,
                                     duration);
                
                animateObject.id = sessionId = session.session;
                
                element.setAttribute(access, sessionId);
                
            }
            // update
            else {
                
                session = SESSIONS[sessionId][4];
                session.update(animateValues, defaults, type);
                
            }
        }
        
        if (stat[2].length) {
            stylize(element, staticValues);
        }
        
        return session || empty;
        
    }