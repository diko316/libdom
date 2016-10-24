'use strict';

var STRING =  require("./string.js"),
    CORE = require("libcore"),
    EASING = require("./easing.js"),
    COLOR = require("./color.js"),
    CSS = require("./css.js"),
    DIMENSION = require("./dimension.js"),
    SESSION_ACCESS = '__animate_session',
    BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    },
    BOX_RE = CSS.boxRe,
    DIMENSION_RE = CSS.dimensionRe,
    COLOR_RE = CSS.colorRe,
    SESSIONS = {},
    EXPORTS = {
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

function animate(handler, from, to, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        C = CORE,
        isObject = C.object,
        list = SESSIONS,
        defaultInterval = EXPORTS.interval,
        clear = clearInterval,
        set = setInterval,
        interval = null,
        frame = 0;
        
    var frames, displacements;
    
    function control() {
        var fn = control;
        
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
        
        // normal animation
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
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string[1152]);
    }
    
    // prepare displacements
    type = C.contains(easing, type) ? easing[type] : easing.linear;
    duration = (C.number(duration) && duration > 0 ? duration : 1) * 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    displacements = [[], [], [], from, control];
    interval = set(callback, defaultInterval);
    control.session = interval;
    control.update = update;
    control.running = true;
    list[interval] = displacements;
    displacements = applyDisplacements(displacements, from, to);
    return control;
    
}

function validValue(value) {
    var C = CORE;
    if (C.string(value)) {
        value = parseFloat(value);
    }
    return C.number(value) && value;
}

function applyDisplacements(session, from, to) {
    var hasOwn = CORE.contains,
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
            
        index = names.indexOf(name);
        source = hasOwn(from, name) && format(from[name]);
        
        // create from source if did not exist
        if (index === -1) {
            if (source === false) {
                continue;
            }
            index = len++;
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
    return CORE.contains(EASING, type);
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
        
    CORE.each(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
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
        console.log('static ', stat);
        CSS.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, last) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        DIMENSION.translate(node,
                            values.left,
                            values.top,
                            values.right,
                            values.bottom,
                            values.width,
                            values.height,
                            values);
        
        CSS.style(node, values);
        
        if (last) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var css = CSS,
        values = css.computedStyle(element, names),
        dimension = DIMENSION,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE,
        colorRe = COLOR_RE,
        colorParse = COLOR.parse,
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
            value = colorParse(value);
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
        value = CSS.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE.test(name)) {
        value = COLOR.parse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (CORE.number(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}


module.exports = EXPORTS;


