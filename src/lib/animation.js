'use strict';

import {
            string,
            number,
            method,
            object,
            contains,
            each
        } from "libcore";
        
import STRING from "./string.js";

import { parse as colorParse } from "./color.js";

import * as EASING from "./easing.js";

import CSS_MODULE from "./css.js";

import DIMENSION from "./dimension.js";


var SESSION_ACCESS = '__animate_session',
    BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    },
    BOX_RE = CSS_MODULE.boxRe,
    DIMENSION_RE = CSS_MODULE.dimensionRe,
    COLOR_RE = CSS_MODULE.colorRe,
    SESSIONS = {},
    exported = {
        easing: EASING,
        defaultEasing: 'easeOut',
        duration: 0.5,
        interval: 10,
        each: animate,
        has: hasAnimationType,
        style: animateStyle
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function animate(callback, from, to, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        isObject = object,
        list = SESSIONS,
        defaultInterval = exported.interval,
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
                throw new Error(string[1152]);
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
        throw new Error(string[1151]);
    }
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string[1152]);
    }
    
    // validate type
    if (alen < 4) {
        type = exported.defaultEasing;
    }
    else if (!hasAnimationType(type)) {
        throw new Error(string[1153]);
    }
    
    // validate duration
    if (alen < 5) {
        duration = exported.duration;
    }
    else if (!number(duration) || duration < 1) {
        throw new Error(string[1154]);
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

function validValue(value) {
    if (string(value)) {
        value = parseFloat(value);
    }
    return number(value) && value;
}

function applyDisplacements(session, from, to) {
    
    each(to, onApplyDisplacement, [from, session], true);
    
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

function hasAnimationType(type) {
    return string(type) && contains(EASING, type);
}

/**
 * CSS animation
 */
function animateStyle(element, styles, type) {
    var access = SESSION_ACCESS,
        stat = [[], {}, [], {}];
    //var values = createElementValues(styles);
    
    var session, sessionId, animateObject,
        names, defaults, animateValues, staticValues;
        
    each(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
        if (!hasAnimationType(type)) {
            type = exported.defaultEasing;
        }
        
        // create
        if (!sessionId) {
            animateObject = {
                node: element
            };
            
            session = animate(createElementHandler(animateObject),
                                            defaults,
                                            animateValues,
                                            type);
            
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
        CSS_MODULE.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, current, total) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        DIMENSION.translate(node,
                            'left' in values ? values.left : null,
                            'top' in values ? values.top : null,
                            'right' in values ? values.right : null,
                            'bottom' in values ? values.bottom : null,
                            'width' in values ? values.width : null,
                            'height' in values ? values.height : null,
                            values);
        
        CSS_MODULE.style(node, values);
        
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
    var css = CSS_MODULE,
        values = css.computedStyle(element, names),
        dimension = DIMENSION,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE,
        colorRe = COLOR_RE,
        parse = colorParse,
        boxRe = BOX_RE,
        boxPosition = BOX_POSITION,
        box = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box) {
                box = dimension.box(element);
            }
            value = box[boxPosition[name]];
        }
        else if (dimensionRe.test(name)) {
            value = cssValue(value);
        }
        else if (colorRe.test(name)) {
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
    else if (BOX_RE.test(name) || DIMENSION_RE.test(name)) {
        value = CSS_MODULE.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE.test(name)) {
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

export default exported;

