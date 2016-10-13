'use strict';

var STRING =  require("./string.js"),
    OBJECT = require("./object.js"),
    ARRAY = require("./array.js"),
    EASING = require("./easing.js"),
    COLOR = require("./color.js"),
    CSS = require("./css.js"),
    DIMENSION = require("./dimension.js"),
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
            type = oType,
            signature = '[object Object]';
        
        if (interval) {
            if (!type(updates, signature)) {
                throw new Error(string[1152]);
            }
            
            if (!type(initialValues, signature)) {
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
    return OBJECT.contains(EASING, type);
}

/**
 * CSS animation
 */
function animateStyle(element, styles, type) {
    var values = createElementValues(styles);
    var session, sessionId, animateObject,
        names, defaults, animateValues, staticValues;
        
        //animate = [element],
        //handler = createAnimationObject(animate);
        
    if (values) {
        names = values[0];
        animateValues = values[1];
        staticValues = values[2];
        
        
        // has animation
        if (names) {
            sessionId = element.__animate_session;
            defaults = createElementDefaults(element, names);
            
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
                
                element.__animate_session = sessionId;
                
            }
            // update
            else {
                
                session = SESSIONS[sessionId][4];
                session.update(animateValues, defaults, type);
                
            }
        }
        
        if (staticValues) {
            CSS.style(element, staticValues);
        }
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, last) {
        var boxRe = BOX_RE,
            css = CSS,
            colorUnit = css.colorUnit,
            formatColor = COLOR.stringify,
            dimensionRe = DIMENSION_RE,
            colorRe = COLOR_RE,
            names = SESSIONS[animate.id][0],
            node = animate.node,
            c = -1,
            l = names.length;
        var name, value;
        
        // transform dimension
        DIMENSION.translate(node,
                            values.left,
                            values.top,
                            values.right,
                            values.bottom,
                            values.width,
                            values.height,
                            values);
        
        // transform others
        for (; l--;) {
            name = names[++c];
            value = values[name];
            if (!boxRe.test(name) && dimensionRe.test(name)) {
                values[name] = '' + value + 'px';
            }
            else if (colorRe.test(name)) {
                values[name] = formatColor(value, colorUnit);
            }
        }
        
        css.style(node, values);
        
        if (last) {
            delete node.__animate_session;
        }
        
        node = null;
    }
    return onAnimate;
}

function createElementDefaults(element, names) {
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

function createElementValues(styles) {
    var O = OBJECT,
        hasOwn = O.contains,
        number = O.number,
        boxRe = BOX_RE,
        cssValue = CSS.unitValue,
        dimensionRe = DIMENSION_RE,
        colorRe = COLOR_RE,
        parseColor = COLOR.parse,
        animateNames = [],
        len = 0,
        animateValues = {},
        staticValues = {},
        hasStaticValues = false;
    var name, raw, value;
    
    for (name in styles) {
        if (hasOwn(styles, name)) {
            value = raw = styles[name];
            
            // opacity
            if (name === 'opacity') {
                value = parseFloat(raw);
                
            }
            // box and dimension
            else if (boxRe.test(name) || dimensionRe.test(name)) {
                value = cssValue(raw);
            }
            // color
            else if (colorRe.test(name)) {
                value = parseColor(raw);
                //console.log('parsed: ', raw, ' == ', value);
                if (value === null) {
                    value = false;
                }
            }
            
            if (number(value)) {
                animateNames[len++] = name;
                animateValues[name] = value;
            }
            else if (value !== false) {
                hasStaticValues = true;
                staticValues[name] = value;
            }
        }
    }
    
    return (!!len || hasStaticValues) && [len ? animateNames : null,
                                        len ? animateValues : null,
                                        hasStaticValues ? staticValues : null];

}


module.exports = EXPORTS;


